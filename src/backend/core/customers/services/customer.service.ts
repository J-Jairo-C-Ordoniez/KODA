import customerRepository from '../repositories/customer.repository';
import { PaginationOptions } from '@/backend/core/sales/repositories/sales.repository';
import { CreateCustomerDTO, UpdateCustomerDTO, CustomerPaymentDTO } from '../types';

const customerService = {
  async getCustomers(tenantId: string, pagination?: PaginationOptions) {
    return customerRepository.getCustomersByTenant(tenantId, pagination);
  },

  async createCustomer(tenantId: string, data: CreateCustomerDTO) {
    if (!data.name?.trim() || !data.phone?.trim()) {
      throw new Error('Nombre y teléfono son requeridos');
    }
    return customerRepository.createCustomer(tenantId, data);
  },

  async getCustomersWithDebt(tenantId: string) {
    return customerRepository.getCustomersWithDebt(tenantId);
  },

  async registerPayment(tenantId: string, customerId: string, data: CustomerPaymentDTO) {
    if (!customerId) throw new Error('ID de cliente requerido');
    if (!data.amount || data.amount <= 0) throw new Error('El monto del abono debe ser mayor a 0');
    return customerRepository.registerPayment(tenantId, customerId, data);
  },

  async updateCustomer(tenantId: string, customerId: string, data: UpdateCustomerDTO) {
    return customerRepository.updateCustomer(tenantId, customerId, data);
  },

  async deleteCustomer(tenantId: string, customerId: string) {
    return customerRepository.deleteCustomer(tenantId, customerId);
  },

  async getCustomerHistory(tenantId: string, customerId: string) {
    return customerRepository.getCustomerHistory(tenantId, customerId);
  },

  async getTopDebtors(tenantId: string) {
    return customerRepository.getTopDebtors(tenantId);
  },

  async getSevereDebtsCount(tenantId: string) {
    return customerRepository.getSevereDebtsCount(tenantId);
  },

  async getPaymentsToday(tenantId: string) {
    return customerRepository.getPaymentsToday(tenantId);
  },

  async addDebt(tenantId: string, customerId: string, amount: number) {
    return customerRepository.addDebt(tenantId, customerId, amount);
  },
}; 

export default customerService;
