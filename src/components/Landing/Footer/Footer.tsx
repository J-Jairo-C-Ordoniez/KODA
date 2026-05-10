import Container from '../../ui/Container';
import Brand from './ui/Brand';
import Nav from './ui/Nav';
import Legal from './ui/Legal';
import Location from './ui/Location';
import Rights from './ui/Rights';

export default function Footer() {
  return (
    <footer className="bg-background text-primary py-10 overflow-hidden relative border-t border-foreground/5">
      <Container>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 relative z-10">
          <Brand />
          <Nav />
          <Legal />
          <Location />
        </section>

        <section className="pt-12 border-t border-foreground/10">
          <Rights />
        </section>
      </Container>
    </footer>
  );
};
