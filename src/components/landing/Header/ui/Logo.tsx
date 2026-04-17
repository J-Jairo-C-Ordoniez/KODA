import Link from 'next/link';

export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2 group ${className}`}
    >
      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center transform group-hover:rotate-6 transition-transform">
        <span className="text-white font-black text-2xl">K</span>
      </div>
      <h2 className="text-lg uppercase font-medium tracking-wider text-primary">KODA</h2>
    </Link>
  );
};
