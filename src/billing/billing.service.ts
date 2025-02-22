import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Billing } from './billing.entity';
import { FetchAllOptions } from './billing.dto';

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(Billing)
    private billingRepository: Repository<Billing>,
  ) {}

  async fetchAll(productCode?: number, location?: string) {
    const options: FetchAllOptions = {};
    if (productCode) {
      options.productId = productCode;
    }

    if (location) {
      options.location = location;
    }

    return await this.billingRepository.find({
      where: options,
    });
  }

  create(billing: Billing) {
    return this.billingRepository.save(billing);
  }

  async seed() {
    const data = await this.fetchAll();
    if (data.length > 0) {
      return;
    }

    console.log(':: seeding data ::');
    const newBillings: Omit<Billing, 'id'>[] = [
      {
        email: 'george.bluth@yahoo.com.my',
        firstName: 'George',
        lastName: 'Bluth',
        photo: 'https://reqres.in/img/faces/1-image.jpg',
        productId: 4000,
        location: 'West Malaysia',
        premiumPaid: 521.03,
      },
      {
        email: 'janet.weaver@gmail.com',
        firstName: 'Janet',
        lastName: 'Weaver',
        photo: 'https://reqres.in/img/faces/2-image.jpg',
        productId: 5000,
        location: 'East Malaysia',
        premiumPaid: 0.0,
      },
      {
        email: 'emma.wong@mailsaur.net',
        firstName: 'Emma',
        lastName: 'Wong',
        photo: 'https://reqres.in/img/faces/3-image.jpg',
        productId: 5000,
        location: 'East Malaysia',
        premiumPaid: 1453.5,
      },
      {
        email: 'eve.holt@googlemail.co.uk',
        firstName: 'Eve',
        lastName: 'Holt',
        photo: 'https://reqres.in/img/faces/4-image.jpg',
        productId: 5000,
        location: 'East Malaysia',
        premiumPaid: 210.0,
      },
      {
        email: 'charles.morris@grabmart.com.my',
        firstName: 'Charles',
        lastName: 'Morris',
        photo: 'https://reqres.in/img/faces/5-image.jpg',
        productId: 4000,
        location: 'West Malaysia',
        premiumPaid: 700.0,
      },
      {
        email: 'tracey.remos@gmail.com',
        firstName: 'Tracey',
        lastName: 'Ramos',
        photo: 'https://reqres.in/img/faces/6-image.jpg',
        productId: 4000,
        location: 'West Malaysia',
        premiumPaid: 0.0,
      },
      {
        email: 'michael.jackson@sony.com',
        firstName: 'Michael',
        lastName: 'Jackson',
        photo: 'https://reqres.in/img/faces/7-image.jpg',
        productId: 5000,
        location: 'East Malaysia',
        premiumPaid: 0.0,
      },
      {
        email: 'gwen.ferguson@bluebottle.com',
        firstName: 'Gwendolyn',
        lastName: 'Ferguson',
        photo: 'https://reqres.in/img/faces/8-image.jpg',
        productId: 4000,
        location: 'West Malaysia',
        premiumPaid: 342.2,
      },
      {
        email: 'tobias.funke@docomo.co.jp',
        firstName: 'Tobias',
        lastName: 'Funke',
        photo: 'https://reqres.in/img/faces/9-image.jpg',
        productId: 4000,
        location: 'East Malaysia',
        premiumPaid: 95.55,
      },
      {
        email: 'byron.fields@gmail.com',
        firstName: 'Byron',
        lastName: 'Fields',
        photo: 'https://reqres.in/img/faces/10-image.jpg',
        productId: 4000,
        location: 'West Malaysia',
        premiumPaid: 0.0,
      },
      {
        email: 'george.edwards@yahoo.co.id',
        firstName: 'George',
        lastName: 'Edwards',
        photo: 'https://reqres.in/img/faces/11-image.jpg',
        productId: 5000,
        location: 'East Malaysia',
        premiumPaid: 105.9,
      },
      {
        email: 'rachel.winterson@altavista.com',
        firstName: 'Rachel',
        lastName: 'Winterson',
        photo: 'https://reqres.in/img/faces/12-image.jpg',
        productId: 4000,
        location: 'West Malaysia',
        premiumPaid: 0.0,
      },
    ];

    try {
      // for (const billing of newBillings) {
      //   console.log('creating billing record for : ', billing.firstName);
      //   this.billingRepository.create(billing);
      // }
      await this.billingRepository.save(newBillings);
    } catch (error) {
      console.error('seeding error : ', error);
    }

    return;
  }
}
