import Link from "next/link";

export default function ContactContent({ contact }) {
    const whatsappLink = `https://wa.me/57${contact}`;

    return (
        <section className="mx-auto w-full py-40 flex flex-col items-center">
            <div className="max-w-2xl text-center space-y-4">
                <h1 className="text-xl md:text-2xl font-medium tracking-widest text-primary uppercase">
                    Ponte en Contacto
                </h1>
                
                <p className="text-secondary leading-relaxed text-sm tracking-wider md:text-base font-light">
                    Estamos aquí para ayudarte. Si tienes alguna duda sobre nuestros productos o 
                    quieres realizar un pedido personalizado, no dudes en escribirnos por WhatsApp. 
                    Nuestro equipo te atenderá lo antes posible.
                </p>

                <div className="pt-8">
                    <Link 
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary/90 hover:bg-primary transition-colors duration-300 text-foreground px-6 py-4 rounded-md text-sm font-medium tracking-wider uppercase"
                    >
                        <span>Escríbenos por WhatsApp</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
