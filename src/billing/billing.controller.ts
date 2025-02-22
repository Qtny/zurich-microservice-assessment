import { Controller, Get, Post } from '@nestjs/common';
import { BillingService } from './billing.service';

@Controller('billing')
export class BillingController {
  constructor(private billingService: BillingService) {}

  @Get()
  getAllBillings() {
    return this.billingService.fetchAll();
  }

  @Post()
  createBilling() {
    return this.billingService.create();
  }
}
