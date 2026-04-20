import Link from 'next/link';

export default function Logo({ type }: { type: 'light' | 'dark' }) {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 group"
    >
      <div className={`w-10 h-10 ${type === 'light' ? 'bg-primary' : 'bg-background'} rounded-lg flex items-center justify-center transform group-hover:rotate-6 transition-transform`}>
        <span className={`font-black text-2xl ${type === 'light' ? 'text-white' : 'text-primary'}`}>K</span>
      </div>
      <h2 className={`text-lg uppercase font-medium tracking-wider ${type === 'light' ? 'text-primary' : 'text-background'}`}>KODA</h2>
    </Link>
  );
};
