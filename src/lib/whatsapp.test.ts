import test from 'node:test';
import assert from 'node:assert/strict';
import {
  NUMBER,
  waBridalMessage,
  waDealMessage,
  waGeneralMessage,
  waLink,
  waServiceMessage,
} from './whatsapp';

test('waLink encodes message with official salon WhatsApp number', () => {
  const url = waLink('Hello Maheen');
  assert.equal(url, `https://wa.me/${NUMBER}?text=Hello%20Maheen`);
});

test('contextual booking message builders format cleanly', () => {
  assert.match(waGeneralMessage(), /Maheen's/);
  assert.match(waServiceMessage('Hair Care'), /Hair Care/);
  assert.match(waDealMessage('Skin Deal 11 - Face Wax Deal'), /Skin Deal 11/);
});

test('waBridalMessage includes date when provided and omits gracefully when empty', () => {
  const withDate = waBridalMessage('Signature Barat Bridal', '2026-12-18');
  assert.match(withDate, /Signature Barat Bridal/);
  assert.match(withDate, /2026-12-18/);

  const withoutDate = waBridalMessage('Signature Barat Bridal', '   ');
  assert.doesNotMatch(withoutDate, /undefined|null/);
  assert.match(withoutDate, /check bridal availability/);
});
