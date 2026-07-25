import { redirect } from 'next/navigation';

export const metadata = { title: 'Clientes y Fiados | KODA' };

export default function EmployeeCustomersPage() {
  redirect('/dashboard/business/customers');
}
