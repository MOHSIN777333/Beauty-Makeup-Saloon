import test from 'node:test';
import assert from 'node:assert/strict';
import {site} from '../data/site';
import {filterGalleryItems, wrapLightboxIndex} from './gallery';

test('filterGalleryItems returns all items up to limit when category is All', () => {
  const all = filterGalleryItems(site.gallery, 'All');
  assert.equal(all.length, Math.min(site.gallery.length, 12));
});

test('filterGalleryItems isolates items matching selected category', () => {
  const bridal = filterGalleryItems(site.gallery, 'Bridal');
  assert.ok(bridal.length > 0);
  assert.ok(bridal.every((item) => item.category === 'Bridal'));
});

test('wrapLightboxIndex wraps cleanly forward and backward', () => {
  assert.equal(wrapLightboxIndex(0, -1, 5), 4);
  assert.equal(wrapLightboxIndex(4, 1, 5), 0);
  assert.equal(wrapLightboxIndex(2, 1, 5), 3);
  assert.equal(wrapLightboxIndex(0, 1, 0), 0);
});
