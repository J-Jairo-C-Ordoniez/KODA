import Container from '../ui/Container';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer id="policies" className="bg-[#1a1a1a] text-white pt-24 pb-12 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 relative z-10">
          <div className="space-y-6">
            <div className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <span className="text-black font-black text-2xl">K</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">KODA</span>
            </div>
            <p className="text-gray-400 font-medium leading-relaxed">
              La plataforma definitiva para el control de inventarios y ventas en el mundo de la moda. Diseñada en La Unión, Nariño para el resto de Colombia.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8">Navegación</h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li><Link href="#inicio" className="hover:text-white transition-colors">Inicio</Link></li>
              <li><Link href="#features" className="hover:text-white transition-colors">Características</Link></li>
              <li><Link href="#pricing" className="hover:text-white transition-colors">Precios</Link></li>
              <li><Link href="/register" className="hover:text-white transition-colors">Registrar Negocio</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8">Información Legal</h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li><Link href="/politicas/terminos" className="hover:text-white transition-colors">Términos y Condiciones</Link></li>
              <li><Link href="/politicas/privacidad" className="hover:text-white transition-colors">Política de Privacidad</Link></li>
              <li><Link href="/politicas/cookies" className="hover:text-white transition-colors">Política de Cookies</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8">Contáctanos</h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase tracking-widest mb-1">Email</span>
                <span className="text-white">soporte@koda.app</span>
              </li>
              <li className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase tracking-widest mb-1">WhatsApp</span>
                <span className="text-white">+57 300 123 4567</span>
              </li>
              <li className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase tracking-widest mb-1">Ubicación</span>
                <span className="text-white">La Unión, Nariño</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          <p className="text-gray-500 font-medium text-sm">
            © 2026 KODA. Todos los derechos reservados.
          </p>
          <div className="flex gap-8 text-sm font-medium text-gray-500">
            <Link href="#" className="hover:text-white">Estado del sistema</Link>
            <Link href="#" className="hover:text-white">Centro de ayuda</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};
