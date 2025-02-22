import { Body, Controller, Get, Post } from '@nestjs/common';
import { BillingService } from './billing.service';
import { BillingDTO, billingDtoToBilling } from './billing.dto';

@Controller('billing')
export class BillingController {
  constructor(private billingService: BillingService) {}

  @Get()
  getAllBillings() {
    return this.billingService.fetchAll();
  }

  @Post()
  createBilling(@Body() body: BillingDTO) {
    // map to billing entity
    const billing = billingDtoToBilling(body);

    // create
    return this.billingService.create(billing);
  }
}
