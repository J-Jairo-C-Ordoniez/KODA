import { AlertTriangle } from 'lucide-react';

export default function Error({ message, colSpan = 2 }: { message: string, colSpan?: number }) {
    return (
        <div className={`p-4 w-full flex justify-center items-center gap-2 text-red-500 mx-auto font-medium text-lg text-center col-span-${colSpan}`}>
            <AlertTriangle size={24} />
            <p>{message}</p>
        </div>
    )
}