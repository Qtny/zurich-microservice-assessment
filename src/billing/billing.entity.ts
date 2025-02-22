import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
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
  photoUrl: string;

  @Column()
  productId: number;

  @Column()
  location: string;

  @Column()
  premiumPaid: string;
}
