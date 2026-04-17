import { NextResponse } from 'next/server';
import { AuthService } from '@/core/modules/auth/sevices/auth.service';

const authService = new AuthService();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const { businessName, ownerName, email, password, whatsApp } = data;
    
    if (!businessName || !ownerName || !email || !password || !whatsApp) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios' },
        { status: 400 }
      );
    }

    const result = await authService.registerBusiness(data);
    
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Registration Error:', error);
    return NextResponse.json(
      { error: error.message || 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
