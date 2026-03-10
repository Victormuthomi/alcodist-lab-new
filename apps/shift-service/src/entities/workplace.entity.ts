import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Shift } from './shift.entity';

@Entity('workplaces')
export class Workplace {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @OneToMany(() => Shift, (shift) => shift.workplace)
  shifts: Shift[];
}
