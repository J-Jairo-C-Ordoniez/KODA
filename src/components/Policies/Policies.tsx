import Header from "@/components/Policies/Header/Header";
import Footer from "@/components/Policies/Footer/Footer";
import Terms from "@/components/Policies/Main/Terms";
import Privacy from "@/components/Policies/Main/Privacy";
import Cookies from "@/components/Policies/Main/Cookies";

function PolicyLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen bg-organic relative overflow-hidden">
            {/* Decorative grid pattern */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-[0.03] pointer-events-none" />
            <Header />
            <main className="grow flex flex-col relative z-10 w-full max-w-4xl mx-auto px-6 py-12 glass-panel rounded-4xl my-10">
                {children}
            </main>
            <Footer />
        </div>
    );
}


export function TermsP() {
    return (
        <PolicyLayout>
            <Terms />
        </PolicyLayout>
    );
}

export function PrivacyP() {
    return (
        <PolicyLayout>
            <Privacy />
        </PolicyLayout>
    );
}

export function CookiesP() {
    return (
        <PolicyLayout>
            <Cookies />
        </PolicyLayout>
    );
}