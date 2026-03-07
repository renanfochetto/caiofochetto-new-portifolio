// types/index.ts
/**
 * Central export hub for all types
 * Import from here for single import point: import { ... } from '@/types'
 */

// ============================================
// RE-EXPORTS - Domain Types
// ============================================
export * from './experience';
export * from './performance-case';
export * from './production-case';

// ============================================
// RE-EXPORTS - Common Types
// ============================================
export * from './common';
export * from './navigation';

// ============================================
// RE-EXPORTS - Utilities
// ============================================
export * from './guards';
export * from './localization';

// ============================================
// CONVENIENCE RE-EXPORTS (Optional - for clarity)
// ============================================
export type { CaseData } from './performance-case';
export type { ProductionCase } from './production-case';
export type { Experience } from './experience';
export type { Locale, LocalizedFields } from './common';
export type { CaseNavigation, CaseNavigationItem } from './navigation';
export { isCaseData, isProductionCase } from './guards';
export { getLocalizedField, getLocalizedArray } from './localization';
