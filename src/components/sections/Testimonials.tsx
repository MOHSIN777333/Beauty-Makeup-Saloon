import {ExternalLink} from 'lucide-react';
import {site} from '../../data/site';
import {Carousel} from '../ui/Carousel';
import {Eyebrow} from '../ui/Eyebrow';
import {Section} from '../ui/Section';
import {StarRating} from '../ui/StarRating';

export function Testimonials() {
  return (
    <Section id="reviews" surface="charcoal">
      <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <Eyebrow>Guest Words</Eyebrow>
          <h2 className="font-display text-3xl md:text-5xl font-medium text-ivory">
            Verified Google Reviews
          </h2>
        </div>

        <a
          href={site.contact.googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-gold-300 transition-colors hover:text-ivory"
        >
          <span>Read all reviews on Google</span>
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>

      <Carousel itemCount={site.reviews.length} ariaLabel="Google guest reviews">
        {site.reviews.map((review) => (
          <article
            key={review.id}
            className="flex w-[86vw] max-w-[360px] shrink-0 snap-start flex-col justify-between rounded-2xl border border-gold-500/20 bg-surface/80 p-6 md:w-auto md:max-w-none md:p-7"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <StarRating rating={review.rating} />
                <span className="text-xs text-muted">{review.source}</span>
              </div>

              <p className="font-display text-xl md:text-2xl font-normal text-ivory leading-relaxed">
                “{review.quote}”
              </p>
            </div>

            <div className="mt-6 flex items-center gap-3.5 border-t border-gold-500/15 pt-4">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold-500/45 bg-ink font-display text-sm font-semibold text-gold-300"
              >
                {review.initials}
              </span>
              <div>
                <p className="text-sm font-medium text-ivory">{review.reviewer}</p>
                <p className="text-xs text-muted">
                  Staff praised: {review.staffMentioned.join(', ')}
                </p>
              </div>
            </div>
          </article>
        ))}
      </Carousel>
    </Section>
  );
}
