import Header from "@/components/policies/Header/Header";
import Footer from "@/components/policies/Footer/Footer";
import Terms from "@/components/policies/Main/Terms";
import Privacy from "@/components/policies/Main/Privacy";
import Cookies from "@/components/policies/Main/Cookies";

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