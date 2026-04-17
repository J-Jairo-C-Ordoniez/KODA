import dotenv from 'dotenv';
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

dotenv.config();

async function main() {
  console.log('--- Database Seeding Started ---');
  
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not defined in environment variables');
  }
  
  const pool = new pg.Pool({ 
    connectionString,
    ssl: true
  });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  // 1. Create SaaS Plans
  console.log('Creating plans...');
  const planEmprendedor = await prisma.plan.upsert({
    where: { planId: 'plan_emprendedor' },
    update: {},
    create: {
      planId: 'plan_emprendedor',
      name: 'Emprendedor',
      description: 'Ideal para pequeños negocios que están empezando su transformación digital.',
      price: 50000,
      interval: 'monthly',
    },
  });

  const planEmpresarial = await prisma.plan.upsert({
    where: { planId: 'plan_empresarial' },
    update: {},
    create: {
      planId: 'plan_empresarial',
      name: 'Empresarial',
      description: 'Para negocios en crecimiento que necesitan control total y soporte prioritario.',
      price: 120000,
      interval: 'monthly',
    },
  });

  console.log('Plans created.');

  // 2. Create SuperAdmin
  console.log('Creating SuperAdmin...');
  const hashedPassword = await bcrypt.hash('KodaSuperAdmin2026!', 10);
  const superAdmin = await prisma.user.upsert({
    where: { email: 'cordobaojhonjairo21@gmail.com' },
    update: {
      password: hashedPassword,
      role: Role.superAdmin,
      isVerified: true,
    },
    create: {
      name: 'Jhon Jairo Cordoba',
      email: 'cordobaojhonjairo21@gmail.com',
      password: hashedPassword,
      role: Role.superAdmin,
      isVerified: true,
    },
  });

  console.log('SuperAdmin created:', superAdmin.email);

  // 3. Create Initial Policies
  console.log('Creating policies...');
  await prisma.policy.upsert({
    where: { policyId: 1 },
    update: {},
    create: {
      policyId: 1,
      title: 'Términos y Condiciones de Uso',
      content: {
        lastUpdate: new Date().toISOString(),
        sections: [
          {
            title: '1. Introducción',
            content: 'Bienvenido a KODA. Al usar nuestra plataforma, aceptas estos términos diseñados para proteger tanto tu negocio como nuestra infraestructura SaaS.'
          },
          {
            title: '2. Suscripciones y Pagos',
            content: 'El acceso a las 7 capas de gestión depende del estado de tu suscripción. Contamos con un periodo de gracia de 3 días post-vencimiento.'
          },
          {
            title: '3. Aislamiento de Datos',
            content: 'KODA garantiza que tus datos comerciales son privados y están aislados mediante identificadores de tenant únicos.'
          }
        ]
      },
    },
  });

  await prisma.policy.upsert({
    where: { policyId: 2 },
    update: {},
    create: {
      policyId: 2,
      title: 'Política de Privacidad',
      content: {
        lastUpdate: new Date().toISOString(),
        sections: [
          {
            title: '1. Recolección de Datos',
            content: 'Recolectamos datos mínimos necesarios para la operación: nombre del negocio, inventario y registros de ventas.'
          },
          {
            title: '2. Seguridad',
            content: 'Utilizamos encriptación de grado industrial para las contraseñas y conexiones protegidas mediante SSL.'
          }
        ]
      },
    },
  });

  console.log('Policies created.');
  console.log('--- Database Seeding Completed ---');
  await prisma.$disconnect();
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  });
