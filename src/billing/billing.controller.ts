import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { BillingService } from './billing.service';
import {
  BillingDTO,
  CreateBillingDTO,
  PutBillingDTOBody,
  PutBillingDTOParam,
} from './billing.dto';
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
  async createBilling(@Body() body: CreateBillingDTO, @Res() res: Response) {
    // map to billing entity
    const billing = BillingDTO.fromCreateDto(body);

    // create
    await this.billingService.create(billing);

    return SuccessfulResponse(
      res,
      HttpStatus.CREATED,
      'Successfully created billing',
      null,
    );
  }

  @Put(':productCode')
  async updateBilling(
    @Param()
    putBillingParams: PutBillingDTOParam,
    @Body() body: PutBillingDTOBody,
    @Res() res: Response,
  ) {
    // check if its an integer
    const productCode = parseInt(putBillingParams.productCode);
    if (!Number.isInteger(productCode)) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'productCode must be a number',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // update all billings
    await this.billingService.updateAll(
      productCode,
      body.location,
      body.premiumPaid,
    );

    return SuccessfulResponse(
      res,
      HttpStatus.NO_CONTENT,
      'Successfully updated all billings',
      null,
    );
  }

  @Delete()
  deleteBilling(
    @Param('productCode', new ParseIntPipe({ optional: true }))
    productCode: string,
    @Res() res: Response,
  ) {
    return SuccessfulResponse(
      res,
      HttpStatus.NO_CONTENT,
      'Successfully updated all billings',
      null,
    );
  }
}
