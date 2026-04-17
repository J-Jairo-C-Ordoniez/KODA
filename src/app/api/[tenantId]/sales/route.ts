import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { SalesController } from '@/core/modules/sales/controllers/sales.controller';

const controller = new SalesController();

export async function POST(req: Request, { params }: { params: Promise<{ tenantId: string }> }) {
  const session = await getServerSession(authOptions);
  const resolvedParams = await params;
  
  if (!session || (session.user.tenantId !== resolvedParams.tenantId && session.user.role !== 'superAdmin')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  return controller.createSale(req, resolvedParams.tenantId, session.user.id);
}

export async function GET(req: Request, { params }: { params: Promise<{ tenantId: string }> }) {
  const session = await getServerSession(authOptions);
  const resolvedParams = await params;
  
  if (!session || (session.user.tenantId !== resolvedParams.tenantId && session.user.role !== 'superAdmin')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  return controller.getSales(resolvedParams.tenantId);
}
