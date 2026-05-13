import Header from "@/components/Policies/Header/Header";
import Footer from "@/components/Policies/Footer/Footer";
import Terms from "@/components/Policies/Main/Terms";
import Privacy from "@/components/Policies/Main/Privacy";
import Cookies from "@/components/Policies/Main/Cookies";

function PolicyLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            {children}
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