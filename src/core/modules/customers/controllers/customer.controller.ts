import customerService from '../services/customer.service';
import { apiResponse } from '@/core/utils/apiResponse';
import { PaginationOptions } from '@/core/modules/sales/repositories/sales.repository';

const customerController = {
  async getCustomers(tenantId: string, pagination?: PaginationOptions) {
    try {
      const customers = await customerService.getCustomers(tenantId, pagination);
      return apiResponse.success(customers);
    } catch (error: any) {
      return apiResponse.error(error.message, 400);
    }
  },

  async createCustomer(tenantId: string, data: any) {
    try {
      const customer = await customerService.createCustomer(tenantId, data);
      return apiResponse.success(customer, 201);
    } catch (error: any) {
      return apiResponse.error(error.message, 400);
    }
  },

  async registerPayment(tenantId: string, customerId: string, data: any) {
    try {
      const payment = await customerService.registerPayment(tenantId, customerId, data);
      return apiResponse.success(payment);
    } catch (error: any) {
      return apiResponse.error(error.message, 400);
    }
  },
};

export default customerController;
