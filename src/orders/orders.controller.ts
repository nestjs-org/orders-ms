import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { PaginationOrdersDto } from './dto/pagination-orders.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern({cmd:'add-one-order'})
  async create(@Payload() createOrderDto: CreateOrderDto) {
    console.log('paso por aqui')
    return this.ordersService.create(createOrderDto).catch((err)=>{
      throw new RpcException(err);
      
    })
  }

  @MessagePattern('get-all-orders')
  findAll(@Payload() pagination: PaginationOrdersDto) {
    console.log('klkkkk')
    return this.ordersService.findAll(pagination);
  }

  @MessagePattern({cmd:'get-one-order'})
  async findOne(@Payload() id: {id: string}) {
    const order = await this.ordersService.findOne(id)
    console.log(order);
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
}
