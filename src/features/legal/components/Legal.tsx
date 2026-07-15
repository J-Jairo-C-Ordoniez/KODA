import Header from "@/features/legal/components/Header/Header";
import Footer from "@/features/legal/components/Footer/Footer"
import Main from "@/features/legal/components/Main/Main"

function LayautLegal({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export function TermsAndCondition() {
    return (
        <LayautLegal>
            <Main title="Términos y Condiciones de Uso" />
        </LayautLegal>
    )
}

export function PrivacyPolicy() {
    return (
        <LayautLegal>
            <Main title="Política de Privacidad" />
        </LayautLegal>
    )
}

export function CookiePolicy() {
    return (
        <LayautLegal>
            <Main title="Política de Cookies" />
        </LayautLegal>
    )
}