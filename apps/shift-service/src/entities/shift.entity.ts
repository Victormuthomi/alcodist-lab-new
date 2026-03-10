import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Worker } from './worker.entity';
import { Workplace } from './workplace.entity';

@Entity('shifts')
export class Shift {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp' })
  endTime: Date;

  @Column({ default: 'scheduled' })
  status: string;

  @ManyToOne(() => Worker, (worker) => worker.shifts)
  worker: Worker;

  @ManyToOne(() => Workplace, (workplace) => workplace.shifts)
  workplace: Workplace;

  @CreateDateColumn()
  createdAt: Date;
}
