export default function PolicyContent({ policyData }) {
    const points = Array.isArray(policyData.content)
        ? policyData.content
        : (typeof policyData.content === 'string' ? JSON.parse(policyData.content) : []);

    return (
        <section className="mx-auto w-full py-20">
            <div className="max-w-4xl mx-auto">
                <ul className="space-y-6 list-disc list-outside pl-5">
                    {points.map((text, idx) => (
                        <li key={idx} className="text-secondary leading-relaxed text-sm tracking-wider md:text-base font-light">
                            {text}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
