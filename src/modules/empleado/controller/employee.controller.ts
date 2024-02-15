import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EmployeeService } from '../service/employee.service';
import { CreateEmployeeDTO } from '../dto/employee.dto';
import { Employee } from '../entity/employee.entity';
import { FindOneParams } from '../utilities/findoneparams';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
  @Post('create')
  async create(@Body() createEmployeeDTO: CreateEmployeeDTO) {
    return this.employeeService.createEmployee(createEmployeeDTO);
  }

  @Get('getAll')
  async getEmployee(): Promise<Employee[]> {
    return this.employeeService.getEmployee();
  }

  @Get(':id')
  async getEmployeeById(@Param() param: FindOneParams): Promise<Employee> {
    return this.employeeService.getEmployeeById(param.id);
  }

  @Delete(':id')
  async deleteEmployee(@Param() param: FindOneParams): Promise<void> {
    await this.employeeService.deleteEmployee(param.id);
  }

  @Patch(':id')
  async updateEmployee(
    @Param() param: FindOneParams,
    @Body() updateData: Partial<Employee>,
  ): Promise<Employee> {
    return this.employeeService.updateEmployee(param.id, updateData);
  }
}
