import Header from "@/components/Help/Header/Header";
import Footer from "@/components/Help/Footer/Footer";
import Main from "@/components/Help/Main/Main";

export default function Help() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Main />
            <Footer />
        </div>
    );
}   