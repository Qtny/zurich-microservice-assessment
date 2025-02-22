import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { BillingService } from './billing.service';
import { BillingDTO, billingDtoToBilling } from './billing.dto';
import { Response } from 'express';
import { SuccessfulResponse } from 'src/utils/apiWrapper';

@Controller('billing')
export class BillingController {
  constructor(private billingService: BillingService) {}

  @Get()
  async getAllBillings(
    @Res() res: Response,
    @Query('productCode', new ParseIntPipe({ optional: true }))
    productCode?: number,
    @Query('location') location?: string,
  ) {
    console.log('start');
    const billings = await this.billingService.fetchAll(productCode, location);
    return SuccessfulResponse(
      res,
      HttpStatus.OK,
      'Successfully fetched all billings',
      billings,
    );
  }

  @Post()
  async createBilling(@Body() body: BillingDTO, @Res() res: Response) {
    // map to billing entity
    const billing = billingDtoToBilling(body);

    // create
    await this.billingService.create(billing);

    return SuccessfulResponse(
      res,
      HttpStatus.CREATED,
      'Successfully created billing',
      null,
    );
  }

  @Put()
  updateBilling() {}

  @Delete()
  deleteBilling() {}
}
