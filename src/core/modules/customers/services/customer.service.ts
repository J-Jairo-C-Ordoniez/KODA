import customerRepository from '../repositories/customer.repository';
import { PaginationOptions } from '@/core/modules/sales/repositories/sales.repository';

const customerService = {
  async getCustomers(tenantId: string, pagination?: PaginationOptions) {
    if (!tenantId) throw new Error('Tenant ID requerido');
    return customerRepository.getCustomersByTenant(tenantId, pagination);
  },

  async createCustomer(tenantId: string, data: { name: string; phone: string }) {
    if (!data.name || !data.phone) throw new Error('Nombre y teléfono son requeridos');
    return customerRepository.createCustomer(tenantId, data);
  },

  async getCustomersWithDebt(tenantId: string) {
    if (!tenantId) throw new Error('Tenant ID requerido');
    return customerRepository.getCustomersWithDebt(tenantId);
  },

  async registerPayment(tenantId: string, customerId: string, data: { amount: number; paymentMethod: string; note?: string }) {
    if (!customerId) throw new Error('ID de cliente requerido');
    if (!data.amount || data.amount <= 0) throw new Error('El monto del abono debe ser mayor a 0');
    return customerRepository.registerPayment(tenantId, customerId, data);
  },

  async updateCustomer(tenantId: string, customerId: string, data: { name?: string; phone?: string }) {
    if (!tenantId || !customerId) throw new Error('IDs requeridos');
    return customerRepository.updateCustomer(tenantId, customerId, data);
  },

  async deleteCustomer(tenantId: string, customerId: string) {
    if (!tenantId || !customerId) throw new Error('IDs requeridos');
    return customerRepository.deleteCustomer(tenantId, customerId);
  },

  async getCustomerHistory(tenantId: string, customerId: string) {
    if (!tenantId || !customerId) throw new Error('IDs requeridos');
    return customerRepository.getCustomerHistory(tenantId, customerId);
  },

  async getTopDebtors(tenantId: string) {
    if (!tenantId) throw new Error('Tenant ID requerido');
    return customerRepository.getTopDebtors(tenantId);
  },
}; 

export default customerService;
