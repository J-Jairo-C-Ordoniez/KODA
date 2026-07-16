import Header from "@/features/auth/components/Header/Header";
import Footer from "@/features/auth/components/Footer/Footer";
import MainLogin from "@/features/auth/components/Main/Login";
import MainRegister from "@/features/auth/components/Main/Register";

function AuthPageLayout({ children }: { children: React.ReactNode; }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}

export function Login() {
    return (
        <AuthPageLayout>
            <MainLogin />
        </AuthPageLayout>
    );
}

export function Register() {
    return (
        <AuthPageLayout>
            <MainRegister />
        </AuthPageLayout>
    );
}