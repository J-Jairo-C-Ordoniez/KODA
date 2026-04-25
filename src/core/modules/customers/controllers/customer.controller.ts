import { NextResponse } from 'next/server';
import customerService from '../services/customer.service';
import { apiResponse } from '../../../../shared/utils/apiResponse';

const customerController = {
  async getCustomers(tenantId: string) {
    try {
      const customers = await customerService.getCustomers(tenantId);
      return NextResponse.json(apiResponse(true, customers));
    } catch (error: any) {
      return NextResponse.json(apiResponse(false, null, error.message), { status: 400 });
    }
  },

  async createCustomer(tenantId: string, data: any) {
    try {
      const customer = await customerService.createCustomer(tenantId, data);
      return NextResponse.json(apiResponse(true, customer), { status: 201 });
    } catch (error: any) {
      return NextResponse.json(apiResponse(false, null, error.message), { status: 400 });
    }
  },

  async registerPayment(tenantId: string, customerId: string, data: any) {
    try {
      const payment = await customerService.registerPayment(tenantId, customerId, data);
      return NextResponse.json(apiResponse(true, payment));
    } catch (error: any) {
      return NextResponse.json(apiResponse(false, null, error.message), { status: 400 });
    }
  },
};

export default customerController;
