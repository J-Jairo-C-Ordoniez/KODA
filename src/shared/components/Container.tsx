import { HTMLAttributes } from 'react';
import { cn } from '@/shared/utils/cn';

export default function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8', className)}
      {...props}
    />
  );
}
