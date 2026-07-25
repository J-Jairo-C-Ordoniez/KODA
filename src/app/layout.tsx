import Providers from "@/shared/components/Providers";
import { Metadata } from "next";

import "../styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://koda.app'),
  title: {
    default: "Koda",
    template: "%s | Koda"
  },
  description: "Koda es una plataforma integral para administrar negocios, ventas, inventario, fiados y empleados con una interfaz moderna, rápida y segura.",
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
    title: "Koda",
    description: "Koda es una plataforma integral para administrar negocios, ventas, inventario, fiados y empleados.",
    siteName: "Koda",
  },
  twitter: {
    card: "summary_large_image",
    title: "Koda",
    description: "Koda es una plataforma integral para administrar negocios, ventas, inventario, fiados y empleados.",
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
      lang="es"
      className="font-vars"
    >
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
