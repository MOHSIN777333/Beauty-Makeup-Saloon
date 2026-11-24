import type {GalleryCategory, GalleryItem} from '../data/site';

export const INITIAL_GALLERY_LIMIT = 12;

export function filterGalleryItems(
  items: readonly GalleryItem[],
  category: GalleryCategory,
  limit: number = INITIAL_GALLERY_LIMIT
): GalleryItem[] {
  const filtered =
    category === 'All' ? items : items.filter((item) => item.category === category);
  return filtered.slice(0, limit);
}

export function wrapLightboxIndex(current: number, delta: number, total: number): number {
  if (total <= 0) return 0;
  return (current + delta + total) % total;
}
