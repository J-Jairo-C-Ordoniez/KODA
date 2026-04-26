interface LoaderProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export default function Loader({ size = 'md', color = 'border-primary', className = '' }: LoaderProps) {
  const sizeClasses = {
    xs: 'h-4 w-4 border-[2px]',
    sm: 'h-6 w-6 border-2',
    md: 'h-12 w-12 border-b-2',
    lg: 'h-20 w-20 border-b-4'
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className={`animate-spin rounded-full ${sizeClasses[size]} ${color}`}></div>
    </div>
  );
}