import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../entity/employee.entity';
import { CreateEmployeeDTO } from '../dto/employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async createEmployee(employee: CreateEmployeeDTO): Promise<Employee> {
    const { salary, tax, discount } = employee;

    const net_salary = salary - tax - discount;
    if (employee.email) {
      throw new HttpException(
        'Su correo electronico ya ha sido registrado',
        HttpStatus.CONFLICT,
      );
    }
    const newEmployee = this.employeeRepository.create({
      ...employee,
      net_salary,
    });
    return await this.employeeRepository.save(newEmployee);
  }

  async getEmployee(): Promise<Employee[]> {
    return await this.employeeRepository.find();
  }

  async getEmployeeById(id: number): Promise<Employee> {
    const Employee = await this.employeeRepository.findOne({
      where: { id: id },
    });
    if (!Employee) {
      throw new NotFoundException(`Empleado con el ID ${id} no encontrado`);
    }
    return Employee;
  }

  async deleteEmployee(id: number): Promise<void> {
    const employee = await this.employeeRepository.findOneBy({ id: id });
    if (!employee) {
      throw new NotFoundException(`Empleado con ID ${id} no encontrado`);
    }
    await this.employeeRepository.remove(employee);
  }

  async updateEmployee(
    id: number,
    updateDate: Partial<Employee>,
  ): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: { id: id },
    });
    if (!employee) {
      throw new NotFoundException(`Empleado con ID ${id} no encontrado`);
    }
    const updatedEmployee = this.employeeRepository.merge(employee, updateDate);
    return this.employeeRepository.save(updatedEmployee);
  }
}
