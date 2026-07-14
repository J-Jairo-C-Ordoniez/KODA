import LandingPage from "@/features/landing/components/LandingPage";
/* import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth"; */

export const metadata = {
  title: "KODA",
  description: "El sistema de ventas, control de fiados e inventario más rápido para negocios de ropa.",
};

export default async function Home() {
  /* const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  } */

  return (
    <LandingPage />
  );
}