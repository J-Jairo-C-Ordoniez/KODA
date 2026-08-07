import customerService from '../services/customer.service';
import { apiResponse } from '@/backend/core/utils/apiResponse';
import { PaginationOptions } from '@/backend/core/sales/repositories/sales.repository';
import { CreateCustomerDTO, UpdateCustomerDTO, CustomerPaymentDTO } from '../types';

const customerController = {
  async getCustomers(tenantId: string, pagination?: PaginationOptions) {
    try {
      const customers = await customerService.getCustomers(tenantId, pagination);
      return apiResponse.success(customers);
    } catch (error: any) {
      return apiResponse.error(error.message || 'Error al obtener clientes', 400);
    }
  },

  async createCustomer(tenantId: string, data: CreateCustomerDTO) {
    try {
      const customer = await customerService.createCustomer(tenantId, data);
      return apiResponse.success(customer, 201);
    } catch (error: any) {
      return apiResponse.error(error.message || 'Error al crear cliente', 400);
    }
  },

  async registerPayment(tenantId: string, customerId: string, data: CustomerPaymentDTO) {
    try {
      const payment = await customerService.registerPayment(tenantId, customerId, data);
      return apiResponse.success(payment);
    } catch (error: any) {
      return apiResponse.error(error.message || 'Error al registrar abono', 400);
    }
  },

  async updateCustomer(tenantId: string, customerId: string, data: UpdateCustomerDTO) {
    try {
      const customer = await customerService.updateCustomer(tenantId, customerId, data);
      return apiResponse.success(customer);
    } catch (error: any) {
      return apiResponse.error(error.message || 'Error al actualizar cliente', 400);
    }
  },

  async deleteCustomer(tenantId: string, customerId: string) {
    try {
      await customerService.deleteCustomer(tenantId, customerId);
      return apiResponse.success({ message: 'Cliente eliminado correctamente' });
    } catch (error: any) {
      return apiResponse.error(error.message || 'Error al eliminar cliente', 400);
    }
  },

  async getCustomerHistory(tenantId: string, customerId: string) {
    try {
      const history = await customerService.getCustomerHistory(tenantId, customerId);
      return apiResponse.success(history);
    } catch (error: any) {
      return apiResponse.error(error.message || 'Error al obtener historial del cliente', 400);
    }
  },
};

export default customerController;
