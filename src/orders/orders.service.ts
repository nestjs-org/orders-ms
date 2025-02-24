import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationOrdersDto } from './dto/pagination-orders.dto';
import { Inject } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config/constants';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {

  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy, private readonly PrismaClient: PrismaService){}

  async create(createOrderDto: CreateOrderDto) {
    const ids = createOrderDto.item.map((p)=> p && p.productId);
    const products = await this.validate(ids) as any[]
    const detalle = createOrderDto.item.reduce((accumulator, current) => {
        const product = products.find(p => p.id === current.productId);
        if (!product) return accumulator;
        accumulator.totalAmout += product.price * current.quantity;
        accumulator.totalItem += current.quantity
        return accumulator;
    }, { totalAmout: 0, totalItem: 0 });
    const order = await this.PrismaClient.orders.create({
      data:{
        totalAmount : detalle.totalAmout,
        totalItems : detalle.totalItem,
        orderItems : {
          create :createOrderDto.item.map(orderItem =>({
            price: products.find((p) => p.id === orderItem.productId).price,
            productId: orderItem.productId,
            quantity: orderItem.quantity
          }))
        },
        status: 'PENDING'
      },
      include:{
        orderItems:{
          select:{
            price: true,
            productId: true,
            quantity: true
          }
        }
      }
    });

    return {
      ...order,
      orderItems: order.orderItems.map((item)=> ({
        ...item,
        product_name: products.find(p => p.id === item.productId).name
      }) )
    }
  }

  async findAll(pagination: PaginationOrdersDto) {
    console.log('eeeo')
    const {limit,page,status} = pagination;
    const limitPage = Math.ceil(await this.PrismaClient.orders.count() / limit);
    const results = await this.PrismaClient.orders.findMany({
      skip: (pagination.page - 1) * limit,
      take: pagination.limit,
      where: {
        status
      }
    });
    if(page > limitPage) throw new RpcException("page number cant be higher than limitPage");

    return {
      page,
      limitPage,
      results
    }

  }

  async findOne(id: {id: string}) {
    const orderFound = await this.PrismaClient.orders.findFirst({
      where: id,
      include:{
        orderItems: true
      }
    })
    const ids = orderFound?.orderItems.map((item) => item.productId) ?? []
    const products = await this.validate(ids);
      if(!orderFound) throw new RpcException({error: 404, message: "Order not found o maybe does not exist"});
      return {
        ...orderFound,
        orderItems: orderFound.orderItems.map((item) => ({
          orderid: item.ordersId,
          price: products.find(p => p.id === item.productId).price,
          name: products.find(p => p.id === item.productId).name,
          quantity: item.quantity,
        }))
      }
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.PrismaClient.orders.update({
      where:{id: id},
      data:updateOrderDto
    })
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }


   async validate(ids: number[]){
      if(ids.length > 0 ) return firstValueFrom(this.client.send({cmd:'check-ids-products'},ids))
      throw new RpcException('array of id must be grather than 0')
      
  }
}
