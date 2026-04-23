import Image from "next/image";

export default function Content({ aboutData }) {
    const paragraphs = Array.isArray(aboutData.content)
        ? aboutData.content
        : (typeof aboutData.content === 'string' ? JSON.parse(aboutData.content) : []);

    return (
        <section className="mx-auto w-full py-10 md:py-20">
            <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
                <article className="space-y-8 flex flex-col justify-start">
                    {paragraphs.slice(0, 3).map((text, idx) => (
                        <p key={idx} className="text-secondary leading-relaxed max-w-lg text-sm tracking-wider md:text-base font-light">
                            {text}
                        </p>
                    ))}
                </article>

                <article className="space-y-8 flex flex-col justify-start">
                    {paragraphs.slice(3).map((text, idx) => (
                        <p key={idx} className="text-secondary leading-relaxed max-w-lg text-sm tracking-wider md:text-base font-light">
                            {text}
                        </p>
                    ))}
                </article>

                <div className="flex items-center">
                    <div className="w-55 h-55 flex flex-col items-center justify-center p-2">
                        {aboutData.logo && (
                            <Image
                                src={aboutData.logo}
                                alt="Logo"
                                width={200}
                                height={200}
                                className="max-w-full max-h-full object-contain"
                            />
                        )}
                    </div>
                </div>
            </div>

            <div className="w-full h-[500px] relative overflow-hidden bg-secondary/5 border border-secondary/10 group">
                {aboutData.photo && (
                    <Image
                        src={aboutData.photo}
                        alt="Nuestra Tienda"
                        width={1920}
                        height={1080}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                )}
            </div>
        </section>
    );
}
