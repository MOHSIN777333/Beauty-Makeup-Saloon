import {useState} from 'react';
import {Sparkles} from 'lucide-react';
import {cn} from '../../lib/cn';

export interface ImageWithBlurProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function ImageWithBlur({
  src,
  alt,
  className,
  imgClassName,
  width,
  height,
  priority = false,
}: ImageWithBlurProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-surface',
        className
      )}
    >
      {!failed ? (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          referrerPolicy="no-referrer"
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn(
            'h-full w-full object-cover transition-opacity duration-500',
            loaded ? 'opacity-100' : 'opacity-0',
            imgClassName
          )}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-surface via-charcoal to-ink p-4 text-center">
          <Sparkles className="h-5 w-5 text-gold-500/70" aria-hidden="true" />
          <span className="font-display text-sm text-muted">{alt}</span>
        </div>
      )}
    </div>
  );
}
