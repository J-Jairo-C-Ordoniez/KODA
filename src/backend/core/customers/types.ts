export interface Customer {
  customerId: string;
  tenantId: string;
  name: string;
  phone: string;
  totalDebt: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface CreateCustomerDTO {
  name: string;
  phone: string;
}

export interface UpdateCustomerDTO {
  name?: string;
  phone?: string;
}

export interface CustomerPaymentDTO {
  amount: number;
  paymentMethod: string;
  note?: string;
}
