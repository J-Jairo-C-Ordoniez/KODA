import { apiResponse } from '@/backend/core/utils/apiResponse';
import employeeService from '../services/employee.service';
import { CreateEmployeeDTO, UpdateEmployeeDTO } from '../types';

const employeeController = {
  async getEmployees(tenantId: string) {
    try {
      const employees = await employeeService.getEmployees(tenantId);
      return apiResponse.success(employees);
    } catch (error: any) {
      return apiResponse.error(error.message || 'Error al obtener empleados', 500);
    }
  },

  async createEmployee(tenantId: string, data: CreateEmployeeDTO) {
    try {
      const employee = await employeeService.createEmployee(tenantId, data);
      return apiResponse.success(employee, 201);
    } catch (error: any) {
      return apiResponse.error(error.message || 'Error al crear empleado', 400);
    }
  },

  async updateEmployee(userId: string, tenantId: string, data: UpdateEmployeeDTO) {
    try {
      const employee = await employeeService.updateEmployee(userId, tenantId, data);
      return apiResponse.success(employee);
    } catch (error: any) {
      return apiResponse.error(error.message || 'Error al actualizar empleado', 400);
    }
  },

  async deleteEmployee(userId: string, tenantId: string) {
    try {
      await employeeService.deleteEmployee(userId, tenantId);
      return apiResponse.success({ deleted: true });
    } catch (error: any) {
      return apiResponse.error(error.message || 'Error al eliminar empleado', 400);
    }
  }
};

export default employeeController;
