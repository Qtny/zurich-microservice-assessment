/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ADMIN } from 'src/user/admin.mock';
import { Billing } from './billing.entity';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BillingDTO {
  @IsNotEmpty()
  @IsNumber()
  productCode: number;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsNumber()
  premiumPaid: number;
}

export type FetchAllOptions = {
  productId?: number;
  location?: string;
};

export function billingDtoToBilling(billingDto: BillingDTO) {
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
