import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Billing } from './billing.entity';

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(Billing)
    private billingRepository: Repository<Billing>,
  ) {}

  fetchAll() {
    return this.billingRepository.find();
  }
  create() {
    return;
  }
}
