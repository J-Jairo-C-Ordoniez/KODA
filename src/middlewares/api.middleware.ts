import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function apiMiddleware(req: NextRequest): Promise<NextResponse | null> {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const res = NextResponse.next();
  res.headers.set('x-tenant-id', (token.tenantId as string) ?? '');
  res.headers.set('x-user-id', (token.sub as string) ?? '');
  res.headers.set('x-user-role', (token.role as string) ?? '');

  return res;
}
