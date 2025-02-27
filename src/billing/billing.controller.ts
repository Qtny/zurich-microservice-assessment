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
  UseGuards,
} from '@nestjs/common';
import { BillingService } from './billing.service';
import {
  BillingDTO,
  CreateBillingDTO,
  PutBillingDTOBody,
  BillingDTOParam,
} from './billing.dto';
import { Response } from 'express';
import { ApiResponse } from 'src/utils/apiWrapper';
import { JwtAuthGuard } from 'src/auth/jwt';
import { ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller('billing')
export class BillingController {
  constructor(private billingService: BillingService) {}

  @Get()
  @ApiQuery({ name: 'productCode', required: false, type: 'number' })
  @ApiQuery({ name: 'location', required: false, type: 'string' })
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  async getAllBillings(
    @Res() res: Response,
    @Query('productCode', new ParseIntPipe({ optional: true }))
    productCode?: number,
    @Query('page', new ParseIntPipe({ optional: true }))
    page?: number,
    @Query('location') location?: string,
  ) {
    const billings = await this.billingService.fetchAll(productCode, location);
    const PAGE_SIZE = 5;
    const PAGE = page ? page : 1;

    const filteredBillings = billings.filter(
      (user) => user.firstName[0] === 'G' || user.lastName[0] === 'W',
    );

    console.log(filteredBillings);
    const totalPages = Math.ceil(filteredBillings.length / PAGE_SIZE);
    const slicedBillings = filteredBillings.slice(
      (PAGE - 1) * PAGE_SIZE,
      PAGE * PAGE_SIZE,
    );

    return ApiResponse(
      res,
      HttpStatus.OK,
      'Successfully fetched all billings',
      {
        billings: slicedBillings,
        totalPages,
        totalCount: filteredBillings.length,
      },
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createBilling(@Body() body: CreateBillingDTO, @Res() res: Response) {
    // map to billing entity
    const billing = BillingDTO.fromCreateDto(body);

    // create
    await this.billingService.create(billing);

    return ApiResponse(
      res,
      HttpStatus.CREATED,
      'Successfully created billing',
      null,
    );
  }

  @Put(':productCode')
  @ApiParam({ name: 'productCode', type: 'number' })
  @UseGuards(JwtAuthGuard)
  async updateBilling(
    @Param()
    putBillingParams: BillingDTOParam,
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
    await this.billingService.updateByProductCode(
      productCode,
      body.location,
      body.premiumPaid,
    );

    return ApiResponse(
      res,
      HttpStatus.NO_CONTENT,
      'Successfully updated all billings',
      null,
    );
  }

  @Delete(':productCode')
  @ApiParam({ name: 'productCode', type: 'number' })
  @UseGuards(JwtAuthGuard)
  async deleteBilling(
    @Param()
    deleteBillingParams: BillingDTOParam,
    @Res() res: Response,
  ) {
    // check if its an integer
    const productCode = parseInt(deleteBillingParams.productCode);
    if (!Number.isInteger(productCode)) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'productCode must be a number',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // delete all billings with productCode
    await this.billingService.deleteByProductCode(productCode);

    return ApiResponse(
      res,
      HttpStatus.NO_CONTENT,
      'Successfully updated all billings',
      null,
    );
  }
}
