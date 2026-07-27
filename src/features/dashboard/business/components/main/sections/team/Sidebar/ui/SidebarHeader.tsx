interface SidebarHeaderProps {
  title?: string;
}

export default function SidebarHeader({ title = 'Equipo' }: SidebarHeaderProps) {
  return (
    <header className="flex items-center justify-between px-2 mt-2">
      <h2 className="text-lg font-medium text-primary tracking-tight">
        {title}
      </h2>
    </header>
  );
}
