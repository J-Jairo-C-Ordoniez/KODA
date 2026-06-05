import Container from '../../ui/Container';
import Brand from './ui/Brand';
import Nav from './ui/Nav';
import Legal from './ui/Legal';
import Location from './ui/Location';
import Rights from './ui/Rights';

export default function Footer() {
  return (
    <footer className="bg-[#040504] text-[#EDECEA] py-16 overflow-hidden relative border-t border-white/[0.04]">
      <Container>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 relative z-10">
          <Brand />
          <Nav />
          <Legal />
          <Location />
        </section>

        <section className="pt-8 border-t border-white/[0.08]">
          <Rights />
        </section>
      </Container>
    </footer>
  );
}
