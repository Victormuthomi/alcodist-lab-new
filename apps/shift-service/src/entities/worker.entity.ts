import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Shift } from './shift.entity';

@Entity('workers')
export class Worker {
  @PrimaryColumn('uuid') // Manual ID because it comes from the broadcast
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @OneToMany(() => Shift, (shift) => shift.worker)
  shifts: Shift[];
}
