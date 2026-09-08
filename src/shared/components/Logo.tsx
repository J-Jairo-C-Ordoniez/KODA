import Link from 'next/link';

export default function Logo({ type, className }: { type?: "light" | "dark", className?: string }) {
  return (
    <Link
      href="/"
      className={`flex items-center group transition-colors ${className || ''}`}
    >
      <div className={`w-14 h-14 md:w-15 md:h-15 ${type === "light" ? "bg-background group-hover:bg-background/80" : "bg-primary group-hover:bg-primary/80"} rounded-full flex items-center justify-center transition-colors shadow-sm`}>
        <span className={`font-black text-2xl md:text-3xl ${type === "light" ? "text-primary" : "text-background"}`}>K</span>
      </div>
    </Link>
  );
}