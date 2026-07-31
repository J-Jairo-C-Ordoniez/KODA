'use client';

import Image from 'next/image';
import { Package } from 'lucide-react';

interface Props {
  images: any[];
  activeImageIndex: number;
  onSelectImage: (index: number) => void;
  productName: string;
}

export default function ProductGallery({ images, activeImageIndex, onSelectImage, productName }: Props) {
  const currentImage = images[activeImageIndex]?.content || images[0]?.content;

  return (
    <figure
      aria-label={`Galería de imágenes de ${productName}`}
      className="flex flex-col items-center gap-6 w-full max-w-md mx-auto m-0"
    >
      <div className="relative w-full h-80 md:h-96 overflow-hidden flex items-center justify-center">
        {currentImage ? (
          <Image
            src={currentImage}
            alt={`Vista ${activeImageIndex + 1} de ${productName}`}
            fill
            className="object-contain transition-all duration-500"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div
            role="img"
            aria-label="Imagen no disponible"
            className="w-full h-full flex flex-col items-center justify-center gap-3 text-primary/15"
          >
            <Package
              size={48}
              strokeWidth={0.75}
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      
      {images.length > 1 && (
        <figcaption className="w-full">
          <ul
            aria-label="Imágenes secundarias de la prenda"
            className="flex items-center justify-center gap-3 overflow-x-auto py-1 list-none p-0 m-0"
          >
            {images.map((img: any, idx: number) => (
              <li key={img.imageId || idx}>
                <button
                  type="button"
                  onClick={() => onSelectImage(idx)}
                  aria-label={`Ver imagen ${idx + 1} de ${images.length}`}
                  aria-current={activeImageIndex === idx ? 'true' : 'false'}
                  className={`
                    relative w-16 h-16 overflow-hidden rounded-lg transition-all cursor-pointer border-0 bg-transparent p-0
                    ${activeImageIndex === idx
                      ? 'opacity-100 ring-2 ring-primary ring-offset-2'
                      : 'opacity-40 hover:opacity-80'
                    }
                  `}
                >
                  <Image
                    src={img.content}
                    alt=""
                    fill
                    className="object-contain"
                  />
                </button>
              </li>
            ))}
          </ul>
        </figcaption>
      )}
    </figure>
  );
}
