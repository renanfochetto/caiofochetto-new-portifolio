// types/guards.ts
/**
 * Type guards for runtime type checking
 */

import type { CaseData } from './performance-case';
import type { ProductionCase } from './production-case';

/**
 * Type guard to check if data is CaseData (Performance case)
 * @param data - Union type to check
 * @returns True if data is CaseData
 */
export function isCaseData(data: CaseData | ProductionCase): data is CaseData {
  return (
    'playlist_url' in data &&
    'metrics' in data &&
    'period' in data
  );
}

/**
 * Type guard to check if data is ProductionCase
 * @param data - Union type to check
 * @returns True if data is ProductionCase
 */
export function isProductionCase(data: CaseData | ProductionCase): data is ProductionCase {
  return (
    'media' in data &&
    'year' in data &&
    !('results' in data)
  );
}
