import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'BILLING_RECORDS',
})
export class Billing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  photo: string;

  @Column()
  productId: number;

  @Column()
  location: string;

  @Column({
    type: 'decimal',
  })
  premiumPaid: number;
}
