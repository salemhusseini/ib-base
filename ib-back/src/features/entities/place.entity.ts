import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { LocationProperties } from '../models/location-properties.model';

@Entity()
export class Place {
  @PrimaryGeneratedColumn('uuid')
  pid: string;

  @Column({ type: 'string', nullable: false })
  userId: string;
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false })
  price: number;

  @Column({ type: 'date', nullable: false })
  dateAvailableFrom: Date;

  @Column({ type: 'date', nullable: false })
  dateAvailableTo: Date;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ type: 'jsonb', nullable: false })
  location: LocationProperties;

  // @ManyToOne((type) => User, (user) => user.places, { nullable: false })
  // user: User;

  // @OneToMany((type) => Booking, (booking) => booking.booking, {
  //   eager: true,
  // })
  // bookings: Booking[];
  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
