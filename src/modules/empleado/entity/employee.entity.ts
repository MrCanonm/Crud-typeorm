import { IsEmail } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  lastname: string;
  @Column()
  date: Date;
  @Column()
  @IsEmail()
  email: string;
  @Column()
  salary: number;
  @Column()
  tax: number;
  @Column()
  discount: number;
  @Column()
  net_salary: number;
}
