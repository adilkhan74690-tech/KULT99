import React, { useState } from 'react';

interface ProductImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallbackText?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  className = '',
  fallbackText,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={`w-full h-full bg-[#161616] border border-neutral-800 flex flex-col items-center justify-center p-4 text-center select-none ${className}`}>
        <span className="font-heading font-extrabold text-xl tracking-tighter text-neutral-500 uppercase">
          KULT<span className="text-neutral-700">99</span>
        </span>
        <span className="text-[9px] font-mono tracking-widest text-neutral-600 uppercase mt-1">
          {fallbackText || alt || 'STREETWEAR ATELIER'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className={className}
      {...props}
    />
  );
};
