import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Request, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Server, Socket } from 'socket.io';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { User } from '@prisma/client';
@WebSocketGateway({
  cors: {
    credentials: true,
    origin: 'http://localhost:5173',
  },
})
export class OrdersGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly ordersService: OrdersService) {}

  @SubscribeMessage('createOrder')
  async create(@MessageBody() createOrderDto: CreateOrderDto) {
    const message = await this.ordersService.create(createOrderDto);
    await this.server.emit('message', message);
    return message;
  }

  @SubscribeMessage('findAllOrders')
  async findAll(@Request() req) {
    const orderAll = await this.ordersService.findAll(req.user);
    await this.server.emit('orderAll', orderAll);
    return orderAll;
  }

  @SubscribeMessage('findOneOrder')
  findOne(@MessageBody() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.findOne(updateOrderDto.id);
  }

  @SubscribeMessage('updateOrder')
  async update(@MessageBody() updateOrderDto: UpdateOrderDto) {
    const update = await this.ordersService.update(updateOrderDto);
    await this.server.emit('update', update);
    return update;
  }

  @SubscribeMessage('removeOrder')
  remove(@MessageBody() id: number) {
    return this.ordersService.remove(id);
  }
}
