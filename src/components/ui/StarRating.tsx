import {Star} from 'lucide-react';
import {cn} from '../../lib/cn';

export interface StarRatingProps {
  rating?: number;
  className?: string;
}

export function StarRating({rating = 5, className}: StarRatingProps) {
  return (
    <div
      className={cn('inline-flex items-center gap-1', className)}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({length: 5}).map((_, i) => (
        <Star
          key={i}
          className={cn(
            'h-3.5 w-3.5',
            i < rating ? 'fill-gold-500 text-gold-500' : 'text-muted/40'
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
