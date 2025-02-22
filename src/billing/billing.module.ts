import { Module } from '@nestjs/common';
import { BillingService } from './billing.service';
import { BillingController } from './billing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Billing } from './billing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Billing])],
  providers: [BillingService],
  controllers: [BillingController],
})
export class BillingModule {}
