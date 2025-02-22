import { Billing } from './billing.entity';

export type BillingDTO = {
  productCode: number;
  location: string;
  premiumPaid: number;
};

export type FetchAllOptions = {
  productId?: number;
  location?: string;
};

export function billingDtoToBilling(billingDto: BillingDTO) {
  const billingEntity: Billing = {
    id: 0,
    email: '',
    firstName: '',
    lastName: '',
    photo: '',
    productId: 0,
    location: '',
    premiumPaid: 0,
  };
  return billingEntity;
}
