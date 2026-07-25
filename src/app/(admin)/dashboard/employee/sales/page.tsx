import { redirect } from 'next/navigation';

export const metadata = { title: 'Ventas (POS) | KODA' };

export default function EmployeeSalesPage() {
  redirect('/dashboard/business/sales');
}
