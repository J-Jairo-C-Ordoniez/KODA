import Link from 'next/link';

export default function Logo({ type }: { type?: "light" | "dark" }) {
  return (
    <Link
      href="/"
      className="flex items-center group transition-colors"
    >
      <div className={`w-10 h-10 ${type === "light" ? "bg-background group-hover:bg-background/80" : "bg-primary group-hover:bg-primary/80"} rounded-lg flex items-center justify-center transition-colors`}>
        <span className={`font-black text-2xl ${type === "light" ? "text-primary" : "text-background"}`}>K</span>
      </div>
    </Link>
  );
}