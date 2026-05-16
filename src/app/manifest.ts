import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Koda | Plataforma de Gestión y Punto de Venta',
    short_name: 'Koda',
    description: 'Koda es la plataforma integral para administrar tu negocio, ventas, inventario y empleados con una interfaz moderna, rápida y segura.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0A0A',
    theme_color: '#FF7A00',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
