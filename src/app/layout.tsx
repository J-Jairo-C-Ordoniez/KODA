import { Outfit, Inter } from "next/font/google";
import "../styles/globals.css";
import { Providers } from "@/components/Shared/Providers";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://koda.app'),
  title: {
    default: "Koda | Plataforma Premium de Gestión y Punto de Venta",
    template: "%s | Koda"
  },
  description: "Koda es la plataforma integral para administrar tu negocio, ventas, inventario y empleados con una interfaz moderna, rápida y segura.",
  keywords: ["software de ventas", "punto de venta", "POS", "gestión de inventario", "administración de negocios", "facturación", "SaaS", "Koda"],
  authors: [{ name: "Koda Team" }],
  creator: "Koda",
  publisher: "Koda Inc.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "/",
    title: "Koda | Plataforma Premium de Gestión y Punto de Venta",
    description: "Koda es la plataforma integral para administrar tu negocio, ventas, inventario y empleados.",
    siteName: "Koda",
  },
  twitter: {
    card: "summary_large_image",
    title: "Koda | Plataforma Premium de Gestión y Punto de Venta",
    description: "Koda es la plataforma integral para administrar tu negocio, ventas, inventario y empleados.",
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
  return (
    <html
      className={`${outfit.variable} ${inter.variable}`}
    >
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
