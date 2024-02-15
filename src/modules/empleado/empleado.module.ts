import { Module } from '@nestjs/common';
import { EmployeeController } from './controller/employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entity/employee.entity';
import { EmployeeService } from './service/employee.service';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService],
})
export class EmpleadoModule {}
