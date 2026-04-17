import Hero from "./sections/Hero";
import Features from "./sections/Features";
import { Integrations } from "./sections/Integrations";
import { Pricing } from "./sections/Pricing";

export default function Main() {
    return (
        <main className="grow">
            <Hero />
            <Features />
            <Integrations />
            <Pricing />
        </main>
    );
}