import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('workplaces')
export class Workplace {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ default: 'active' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
