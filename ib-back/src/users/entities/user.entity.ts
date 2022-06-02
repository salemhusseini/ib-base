import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ unique: true, nullable: true })
  username: string;

  @Column(
    { nullable: false },
    // ,{select: false}
  )
  password: string;

  // @OneToMany((type) => Place, (place) => place.user, {
  //   onDelete: 'CASCADE',
  // })
  // places: Place[];

  // @OneToMany((type) => Booking, (booking) => booking.user, {
  //   eager: true,
  // })
  // bookings: Booking[];
}
