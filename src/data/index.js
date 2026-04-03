import * as data2025 from './2025';
import * as data2026 from './2026';

export const getYearData = (yearStr) => {
  if (yearStr === '2025/2026') return data2025;
  if (yearStr === '2026/2027') return data2026;
  return data2026; // fallback for 2027/2028 temporarily
};
