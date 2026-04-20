import Header from "@/components/Auth/Header/Header";
import Footer from "@/components/Auth/Footer/Footer";
import Login from "@/components/Auth/Main/Login";
import Register from "@/components/Auth/Main/Register";

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