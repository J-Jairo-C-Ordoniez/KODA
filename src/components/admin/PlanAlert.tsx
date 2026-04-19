"use client";

import { CreditCard, AlertCircle } from "lucide-react";
import Link from "next/link";
import Container from "@/components/landing/ui/Container";

interface PlanAlertProps {
  status: string;
}

export default function PlanAlert({ status }: PlanAlertProps) {
  if (status !== 'noVerify') return null;

  return (
    <div className="bg-navy p-4 text-white relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-white/10 p-2 rounded-lg">
            <AlertCircle size={20} className="text-white" />
          </div>
          <p className="text-sm font-bold tracking-tight">
            Tu negocio está casi listo. Activa un plan para empezar a disfrutar de todas las funciones de KODA.
          </p>
        </div>
        <Link 
          href="/dashboard/settings/billing" 
          className="bg-white text-navy px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white/90 transition-all shadow-lg"
        >
          Activar Ahora
        </Link>
      </div>
    </div>
  );
}
