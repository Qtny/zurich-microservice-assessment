import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BillingService } from './billing.service';
import { BillingDTO, billingDtoToBilling } from './billing.dto';

@Controller('billing')
export class BillingController {
  constructor(private billingService: BillingService) {}

  @Get()
  getAllBillings(
    @Query('productCode') productCode?: number,
    @Query('location') location?: string,
  ) {
    return this.billingService.fetchAll(productCode, location);
  }

  @Post()
  createBilling(@Body() body: BillingDTO) {
    // map to billing entity
    const billing = billingDtoToBilling(body);

    // create
    return this.billingService.create(billing);
  }

  @Put()
  updateBilling() {}

  @Delete()
  deleteBilling() {}
}
