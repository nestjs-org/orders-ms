import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create.order.dto';
import { UpdateOrderDto } from './dto/update.order.dto';
import { EventPattern, MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { PaginationOrdersDto } from './dto/pagination.orders.dto';
import { CompleteOrderDto } from './dto/complete.order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern({cmd:'add-one-order'})
  async create(@Payload() createOrderDto: CreateOrderDto) {
    const order = await this.ordersService.create(createOrderDto).catch((err)=>{
     throw new RpcException(err)
    })
     const stripeOrder = await this.ordersService.createSessionWithOrder(order);
     console.log({ order, stripeOrder })
     return { order, stripeOrder };
  }

  @MessagePattern('get-all-orders')
  async findAll(@Payload() pagination: PaginationOrdersDto) {
    return await this.ordersService.findAll(pagination);
  }

  @MessagePattern({cmd:'get-one-order'})
  async findOne(@Payload() id: {id: string}) {
    const order = await this.ordersService.findOne(id)
    return order
  }

  @MessagePattern({cmd:'update-status-order'})
  update(@Payload() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(updateOrderDto.id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
  @EventPattern('complete.payment.order')
  completeOrder(@Payload() completeOrderDto: CompleteOrderDto){
    return this.ordersService.linkOrderWithStripe(completeOrderDto)
  }
}
