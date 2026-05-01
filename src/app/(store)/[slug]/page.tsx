import React from "react";
import { LandingStore } from "@/components/store/Store";
import { Metadata } from 'next';
import tenantController from '@/core/modules/tenants/controllers/tenant.controller';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const response = await tenantController.getTenantBySlug(slug);
  const tenant = (response as any).success ? (response as any).data : null;

  if (!tenant) return { title: "Tienda no encontrada" };

  return {
    title: `${tenant.businessName} | Inicio`,
    description: `Bienvenido a la tienda de ${tenant.businessName}.`,
  };
}

export default async function StorePage({ params }: Props) {
    const { slug } = await params;
    return <LandingStore slug={slug} />;
}
