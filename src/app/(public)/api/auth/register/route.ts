import { NextResponse } from 'next/server';
import tenantController from '@/core/modules/tenants/controllers/tenant.controller';


export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { businessName, ownerName, email, password, whatsapp } = data;
    
    if (!businessName || !ownerName || !email || !password || !whatsapp) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios' },
        { status: 400 }
      );
    }

    const result = await tenantController.registerBusiness(data);
    
    return NextResponse.json({
      success: true,
      message: 'Negocio registrado con éxito',
      user: {
        id: result.user.userId,
        email: result.user.email,
        name: result.user.name,
        tenantId: result.user.tenantId,
        role: result.user.role
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Error interno del servidor' },
      { status: 500 }
    );
  }
}