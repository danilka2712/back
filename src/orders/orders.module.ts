import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';

import { OrdersGateway } from './orders.gateway';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@Module({
  providers: [
    OrdersGateway,
    OrdersService,
    PrismaService,
    JwtService,
    AuthService,
  ],
})
export class OrdersModule {}
