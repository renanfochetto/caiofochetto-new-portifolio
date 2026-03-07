// types/localization.ts
/**
 * Localization utilities for extracting localized fields
 */

import type { Locale } from './common';

/**
 * Extract a localized string field based on locale priority
 * @param data - Object containing localized fields
 * @param fieldName - Base field name (without _pt, _en, _es suffix)
 * @param locale - Target locale
 * @returns Localized string value with fallback chain
 */
export function getLocalizedField(
  data: Record<string, any>,
  fieldName: string,
  locale: Locale
): string {
  const pt = data[`${fieldName}_pt`];
  const en = data[`${fieldName}_en`];
  const es = data[`${fieldName}_es`];

  if (locale === 'pt') return pt || en || es || '';
  if (locale === 'en') return en || es || pt || '';
  return es || en || pt || '';
}

/**
 * Extract a localized array field based on locale priority
 * @param data - Object containing localized fields
 * @param fieldName - Base field name (without _pt, _en, _es suffix)
 * @param locale - Target locale
 * @returns Localized array value with fallback chain
 */
export function getLocalizedArray(
  data: Record<string, any>,
  fieldName: string,
  locale: Locale
): string[] {
  const pt = data[`${fieldName}_pt`];
  const en = data[`${fieldName}_en`];
  const es = data[`${fieldName}_es`];

  if (locale === 'pt') return pt || en || es || [];
  if (locale === 'en') return en || es || pt || [];
  return es || en || pt || [];
}
