import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateEmployeeDTO {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  lastname: string;
  @IsNotEmpty()
  date: Date;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  salary: number;
  @IsNotEmpty()
  tax: number;
  @IsNotEmpty()
  discount: number;
  net_salary: number;
}
