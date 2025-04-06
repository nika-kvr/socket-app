import { Module } from '@nestjs/common';
import { GateWay } from './gateway.gateway';

@Module({
  providers: [GateWay],
})
export class Gateway {}
