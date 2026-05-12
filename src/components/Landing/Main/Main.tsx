import Hero from "./sections/Hero";
import Details from "./sections/Details";
import Features from "./sections/Features";
import Integrations from "./sections/Integrations";
import Pricing from "./sections/Pricing";

export default function Main() {
    return (
        <main className="grow">
            <Hero />
            <Details />
            <Features />
            <Integrations />
            <Pricing />
        </main>
    );
}