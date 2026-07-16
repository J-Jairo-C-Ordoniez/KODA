import Brand from '@/features/legal/components/Footer/ui/Brand';
import Legal from '@/features/legal/components/Footer/ui/Legal'; 
import Location from '@/features/legal/components/Footer/ui/Location';
import Rights from '@/features/legal/components/Footer/ui/Rights';

export default function Footer() {
  return (
    <footer className="bg-background text-foreground overflow-hidden relative border-t border-foreground/5">
      <div className='mx-auto px-10 py-12'>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-6 relative z-10">
          <Brand />
          <Legal />
          <Location />
        </section>

        <section className="pt-8 border-t border-foreground/5">
          <Rights />
        </section>
      </div>
    </footer>
  );
}
