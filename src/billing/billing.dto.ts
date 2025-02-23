/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ADMIN } from 'src/user/admin.mock';
import { Billing } from './billing.entity';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBillingDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  productCode: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  premiumPaid: number;
}

export class PutBillingDTOBody {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  premiumPaid: number;
}

export class BillingDTOParam {
  @IsNotEmpty()
  @IsString()
  productCode: string;
}

export type FetchAllOptions = {
  productId?: number;
  location?: string;
};

export class BillingDTO {
  public static fromCreateDto(billingDto: CreateBillingDTO) {
    const mockUser = ADMIN;
    const billingEntity: Omit<Billing, 'id'> = {
      email: mockUser.email,
      firstName: mockUser.firstName,
      lastName: mockUser.lastName,
      photo: mockUser.photo,
      productId: billingDto.productCode,
      location: billingDto.location,
      premiumPaid: billingDto.premiumPaid,
    };

    return billingEntity;
  }
}
