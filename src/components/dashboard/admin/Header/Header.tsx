import Logo from '@/components/ui/Logo';

export default function Header() {
  return (
    <header className="px-8 col-span-full h-18 w-full bg-background py-4 border-b border-foreground/5">
      <Logo type="light" />
    </header>
  );
};