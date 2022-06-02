import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Place } from './place.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  bid: string;

  @Column({ nullable: true })
  placeTitle: string;

  @Column({ nullable: false })
  numberOfGuests: number;

  @Column({ type: 'string', nullable: false })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'string', nullable: false })
  placeId: string;

  @ManyToOne(() => Place)
  @JoinColumn({ name: 'placeId' })
  place: Place;

  // @ManyToOne((type) => User, (user) => user.bookings)
  // user: User;

  // @ManyToOne((type) => Place, (place) => place.bookings)
  // // @Exclude({ toPlainOnly: true })
  // booking: Booking;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
