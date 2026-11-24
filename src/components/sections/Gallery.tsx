import {useMemo, useState} from 'react';
import {ExternalLink, Maximize2} from 'lucide-react';
import {site, type GalleryCategory, type GalleryItem} from '../../data/site';
import {cn} from '../../lib/cn';
import {filterGalleryItems} from '../../lib/gallery';
import {Chip} from '../ui/Chip';
import {Eyebrow} from '../ui/Eyebrow';
import {ImageWithBlur} from '../ui/ImageWithBlur';
import {Section} from '../ui/Section';
import {Lightbox} from './Lightbox';

export function Gallery() {
  const [category, setCategory] = useState<GalleryCategory>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visibleItems = useMemo(
    () => filterGalleryItems(site.gallery, category),
    [category]
  );

  const handleOpenItem = (item: GalleryItem) => {
    const idx = visibleItems.findIndex((entry) => entry.id === item.id);
    setLightboxIndex(idx >= 0 ? idx : 0);
  };

  return (
    <Section id="gallery" surface="charcoal">
      <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <Eyebrow>Our Work</Eyebrow>
          <h2 className="font-display text-3xl md:text-5xl font-medium text-ivory">
            Signature Looks &amp; Studio Craft
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
          <a
            href={site.social.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-1.5 text-gold-300 transition-colors hover:text-ivory"
          >
            <span>See more on Facebook ({site.social.facebookFollowers})</span>
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          {site.social.instagramUrl && (
            <a
              href={site.social.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-1.5 text-gold-300 transition-colors hover:text-ivory"
            >
              <span>Instagram</span>
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>

      {/* Category Filter Chips */}
      <div
        role="group"
        aria-label="Filter gallery by category"
        className="no-scrollbar -mx-5 mb-8 flex items-center gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
      >
        {site.galleryCategories.map((cat) => (
          <Chip
            key={cat}
            label={cat}
            active={category === cat}
            layoutId="gallery-filter-pill"
            onClick={() => {
              setCategory(cat);
              setLightboxIndex(null);
            }}
          />
        ))}
      </div>

      {/* Responsive Masonry Grid (2 cols mobile, 3 cols desktop) */}
      <div className="columns-2 gap-4 space-y-4 md:columns-3 md:gap-5 md:space-y-5">
        {visibleItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleOpenItem(item)}
            aria-label={`View ${item.title}`}
            className="group relative block w-full break-inside-avoid overflow-hidden rounded-2xl border border-gold-500/20 bg-surface text-left transition-colors hover:border-gold-300/50 cursor-pointer"
          >
            <div
              className={cn(
                'w-full overflow-hidden',
                item.aspectRatio === '3/4' ? 'aspect-[3/4]' : 'aspect-[4/3]'
              )}
            >
              <ImageWithBlur
                src={item.image}
                alt={item.alt}
                width={item.aspectRatio === '3/4' ? 600 : 800}
                height={item.aspectRatio === '3/4' ? 800 : 600}
                className="h-full w-full"
                imgClassName="object-top transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-80 transition-opacity group-hover:opacity-95"
            />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3.5 md:p-4">
              <div>
                <p className="text-[11px] font-medium tracking-[0.16em] text-gold-300 uppercase">
                  {item.category}
                </p>
                <p className="font-display text-base md:text-lg font-medium text-ivory leading-snug">
                  {item.title}
                </p>
              </div>
              <span className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold-500/35 bg-ink/75 text-gold-300 sm:flex">
                <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        items={visibleItems}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChangeIndex={(next) => setLightboxIndex(next)}
      />
    </Section>
  );
}
