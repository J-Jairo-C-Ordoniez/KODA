import bcrypt from 'bcryptjs';
import employeeRepository from '../repositories/employee.repository';

const employeeService = {
  async getEmployees(tenantId: string) {
    return await employeeRepository.getEmployeesByTenant(tenantId);
  },

  async createEmployee(tenantId: string, data: { name: string; email: string; password: string; avatar?: string }) {
    if (!data.name || !data.email || !data.password) {
      throw new Error('Nombre, email y contraseña son requeridos.');
    }

    const existing = await employeeRepository.findByEmail(data.email);
    if (existing) {
      throw new Error('Ya existe un usuario con este correo electrónico.');
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    return await employeeRepository.createEmployee({
      tenantId,
      name: data.name,
      email: data.email,
      password: hashedPassword,
      avatar: data.avatar
    });
  },

  async updateEmployee(userId: string, tenantId: string, data: { name?: string; email?: string; password?: string; avatar?: string }) {
    const employee = await employeeRepository.getEmployeeById(userId, tenantId);
    if (!employee) {
      throw new Error('Empleado no encontrado o no pertenece a este negocio.');
    }

    const updates: any = {};
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

    return await employeeRepository.updateEmployee(userId, tenantId, updates);
  },

  async deleteEmployee(userId: string, tenantId: string) {
    const employee = await employeeRepository.getEmployeeById(userId, tenantId);
    if (!employee) {
      throw new Error('Empleado no encontrado o no pertenece a este negocio.');
    }
    return await employeeRepository.deleteEmployee(userId, tenantId);
  }
};

export default employeeService;
