import { redirect } from 'next/navigation';

export default function EmployeeRootPage() {
  redirect('/dashboard/employee/sales');
}
