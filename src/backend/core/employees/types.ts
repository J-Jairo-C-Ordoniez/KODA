export interface Employee {
  userId: string;
  tenantId: string;
  name: string;
  email: string;
  role: string;
  avatar?: string | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface CreateEmployeeDTO {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface UpdateEmployeeDTO {
  name?: string;
  email?: string;
  password?: string;
  avatar?: string;
}
