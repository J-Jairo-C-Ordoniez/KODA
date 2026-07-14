import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Koda',
    short_name: 'Koda',
    description: 'Koda es una plataforma integral para administrar negocios, ventas, inventario, fiados y empleados con una interfaz moderna, rápida y segura.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAFAF9',
    theme_color: '#C9963A',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
