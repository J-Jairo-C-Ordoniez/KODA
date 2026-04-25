import customerRepository from '../repositories/customer.repository';

const customerService = {
  async getCustomers(tenantId: string) {
    if (!tenantId) throw new Error('Tenant ID requerido');
    return customerRepository.getCustomersByTenant(tenantId);
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
};

export default customerService;
