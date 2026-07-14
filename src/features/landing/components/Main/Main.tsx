import Hero from '@/features/landing/components/Main/sections/Hero';
import Problem from '@/features/landing/components/Main/sections/Problem';
import Migration from '@/features/landing/components/Main/sections/Migration';
import Features from '@/features/landing/components/Main/sections/Features';
import WhatsappSales from '@/features/landing/components/Main/sections/WhatsappSales';
import Plans from '@/features/landing/components/Main/sections/Plans';

export default function Main() {
    return (
        <main className="grow">
            <Hero />
            <Problem />
            <Migration />
            <Features />
            <WhatsappSales />
            <Plans />
        </main>
    );
}