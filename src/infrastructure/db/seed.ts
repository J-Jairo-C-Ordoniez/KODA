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
    update: {
      title: 'Términos y Condiciones de Uso',
      content: {
        lastUpdate: new Date().toISOString(),
        sections: [
          {
            title: '1. Aceptación del Servicio',
            content: 'Al acceder y utilizar KODA, el usuario (en adelante "el Comercio") acepta quedar vinculado por estos términos. Si no está de acuerdo, debe abstenerse de usar la plataforma.'
          },
          {
            title: '2. Licencia de Uso',
            content: 'KODA otorga una licencia limitada, no exclusiva e intransferible para el uso del software POS, gestión de inventarios y control de deudas bajo modalidad SaaS.'
          },
          {
            title: '3. Propiedad de los Datos',
            content: 'El Comercio mantiene la propiedad total de los datos de sus clientes, productos y ventas registrados. KODA actúa únicamente como procesador de datos.'
          },
          {
            title: '4. Suscripciones y Pagos',
            content: 'El acceso depende de una suscripción activa. El incumplimiento en los pagos resultará en la suspensión del acceso tras un periodo de gracia de 3 días.'
          }
        ]
      },
    },
    create: {
      policyId: 1,
      title: 'Términos y Condiciones de Uso',
      content: { lastUpdate: new Date().toISOString(), sections: [] },
    },
  });

  await prisma.policy.upsert({
    where: { policyId: 2 },
    update: {
      title: 'Política de Privacidad',
      content: {
        lastUpdate: new Date().toISOString(),
        sections: [
          {
            title: '1. Información Recolectada',
            content: 'Recolectamos datos técnicos de navegación y la información explícita de inventario, ventas y clientes necesaria para la operación.'
          },
          {
            title: '2. Uso de la Información',
            content: 'Los datos se utilizan para generar reportes, gestionar stock y seguimiento de deudas.'
          }
        ]
      },
    },
    create: {
      policyId: 2,
      title: 'Política de Privacidad',
      content: { lastUpdate: new Date().toISOString(), sections: [] },
    },
  });

  await prisma.policy.upsert({
    where: { policyId: 3 },
    update: {
      title: 'Política de Cookies',
      content: {
        lastUpdate: new Date().toISOString(),
        sections: [
          {
            title: '1. Uso de Cookies',
            content: 'Utilizamos cookies técnicas de sesión y seguridad para garantizar el funcionamiento del dashboard y el catálogo.'
          }
        ]
      },
    },
    create: {
      policyId: 3,
      title: 'Política de Cookies',
      content: { lastUpdate: new Date().toISOString(), sections: [] },
    },
  });

  await prisma.policy.upsert({
    where: { policyId: 4 },
    update: {
      title: 'Centro de Ayuda',
      content: {
        lastUpdate: new Date().toISOString(),
        sections: [
          {
            title: 'Asistencia Personalizada',
            content: 'Ofrecemos soporte directo para la configuración de tu tienda, carga de inventarios y gestión de pagos.'
          },
          {
            title: 'Canal de WhatsApp',
            content: 'Nuestro equipo responde de forma inmediata a través de la línea oficial de soporte de KODA.'
          }
        ]
      },
    },
    create: {
      policyId: 4,
      title: 'Centro de Ayuda',
      content: { lastUpdate: new Date().toISOString(), sections: [] },
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
