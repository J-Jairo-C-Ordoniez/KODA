import bcrypt from 'bcryptjs';
import employeeRepository from '../repositories/employee.repository';
import { CreateEmployeeDTO, UpdateEmployeeDTO } from '../types';

const employeeService = {
  async getEmployees(tenantId: string) {
    return employeeRepository.getEmployeesByTenant(tenantId);
  },

  async createEmployee(tenantId: string, data: CreateEmployeeDTO) {
    if (!data.name?.trim() || !data.email?.trim() || !data.password) {
      throw new Error('Nombre, email y contraseña son requeridos.');
    }

    const existing = await employeeRepository.findByEmail(data.email);
    if (existing) {
      throw new Error('Ya existe un usuario con este correo electrónico.');
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    return employeeRepository.createEmployee({
      tenantId,
      name: data.name,
      email: data.email,
      password: hashedPassword,
      avatar: data.avatar
    });
  },

  async updateEmployee(userId: string, tenantId: string, data: UpdateEmployeeDTO) {
    const employee = await employeeRepository.getEmployeeById(userId, tenantId);
    if (!employee) {
      throw new Error('Empleado no encontrado o no pertenece a este negocio.');
    }

    const updates: Partial<CreateEmployeeDTO> = {};
    if (data.name) updates.name = data.name;
    if (data.avatar !== undefined) updates.avatar = data.avatar;

    if (data.email && data.email !== employee.email) {
      const existing = await employeeRepository.findByEmail(data.email);
      if (existing) throw new Error('El email ya está en uso por otro usuario.');
      updates.email = data.email;
    }

    if (data.password) {
      updates.password = await bcrypt.hash(data.password, 12);
    }

    return employeeRepository.updateEmployee(userId, tenantId, updates);
  },

  async deleteEmployee(userId: string, tenantId: string) {
    const employee = await employeeRepository.getEmployeeById(userId, tenantId);
    if (!employee) {
      throw new Error('Empleado no encontrado o no pertenece a este negocio.');
    }
    return employeeRepository.deleteEmployee(userId, tenantId);
  }
};

export default employeeService;
