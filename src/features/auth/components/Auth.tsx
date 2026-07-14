import Header from "@/features/auth/components/Header/Header";
import Footer from "@/features/auth/components/Footer/Footer";
import Login from "@/features/auth/components/Main/Login";
import Register from "@/features/auth/components/Main/Register";

export function LoginP() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Login />
            <Footer />
        </div>
    );
}

export function RegisterP() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Register />
            <Footer />
        </div>
    );
}