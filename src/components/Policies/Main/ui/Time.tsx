export default function Time({ time }: { time: string }) {
    return (
        <p className="text-xs font-bold text-foreground w-full uppercase tracking-widest pb-10">
            Última actualización:{' '}
            {new Date(time).toLocaleDateString('es-ES', {
                day: 'numeric', month: 'long', year: 'numeric'
            })}
        </p>
    );
}