import Hero from "./sections/Hero";
import TheChaos from "./sections/TheChaos";
import Accompaniment from "./sections/Accompaniment";
import TheControl from "./sections/TheControl";
import Integrations from "./sections/Integrations";
import Pricing from "./sections/Pricing";

export default function Main() {
    return (
        <main className="grow">
            <Hero />
            <TheChaos />
            <Accompaniment />
            <TheControl />
            <Integrations />
            <Pricing />
        </main>
    );
}