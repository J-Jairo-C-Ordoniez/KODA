export default function Header({ title, description }) {
    return (
        <header>
            <h1 className="text-lg md:text-xl font-medium tracking-widest text-primary uppercase">
                {title}
            </h1>
            <p className="text-secondary leading-relaxed text-sm tracking-wider md:text-base font-light">
                {description}
            </p>
        </header>
    );
}