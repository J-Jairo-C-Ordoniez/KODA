import React from "react";
import { LandingStore } from "@/components/Store/Store";
import { Metadata } from 'next';
import tenantController from '@/core/modules/tenants/controllers/tenant.controller';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const response = await tenantController.getTenantBySlug(slug);
  const json = (response as any).json ? await (response as any).json() : response;
  const tenant = (json as any).success ? (json as any).data : null;

  if (!tenant) return { title: "Tienda no encontrada" };

  return {
    title: `${tenant.businessName} | Tienda`,
    description: tenant.description || `Bienvenido a la tienda oficial de ${tenant.businessName}.`,
  };
}

export default async function StorePage({ params }: Props) {
    const { slug } = await params;
    return <LandingStore slug={slug} />;
}
