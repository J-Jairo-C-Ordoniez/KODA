import Header from "@/components/Policies/Header/Header";
import Footer from "@/components/Policies/Footer/Footer";
import Terms from "@/components/Policies/Main/Terms";
import Privacy from "@/components/Policies/Main/Privacy";
import Cookies from "@/components/Policies/Main/Cookies";

export function TermsP() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Terms />
            <Footer />
        </div>
    );
}

export function PrivacyP() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Privacy />
            <Footer />
        </div>
    );
}

export function CookiesP() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Cookies />
            <Footer />
        </div>
    );
}