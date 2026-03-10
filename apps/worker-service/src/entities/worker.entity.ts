import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('workers') // This defines the table name in Postgres
export class Worker {
  @PrimaryGeneratedColumn('uuid') // Using UUIDs is a Best Practice for Microservices
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true }) // Ensure no two workers have the same email
  email: string;

  @Column({ default: 'active' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
