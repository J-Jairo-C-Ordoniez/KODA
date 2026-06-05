import Link from 'next/link';

export default function Logo({ type }: { type: 'light' | 'dark' }) {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 group transition-colors"
    >
      <div className={`w-10 h-10 ${type === 'light' ? 'bg-contrast' : 'bg-background'} rounded-lg flex items-center justify-center group-hover:scale-105 transition-all`}>
        <span className={`font-black text-2xl ${type === 'light' ? 'text-white' : 'text-primary'}`}>K</span>
      </div>
    </Link>
  );
};