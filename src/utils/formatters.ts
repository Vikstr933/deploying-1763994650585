/**
 * Format number as currency
 */
export function formatCurrency(
  amount: number,
  options: {
    currency?: string;
    locale?: string;
    decimals?: number
  } = {}
): string {
  const {
    currency = 'USD',
    locale = 'en-US',
    decimals = 2
  } = options;

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(amount)
  } catch (error) {
    // Fallback if Intl fails
    return `$${amount.toFixed(decimals)}`
  }
}

/**
 * Format number with thousand separators
 */
export function formatNumber(
  value: number,
  options: {
    locale?: string;
    decimals?: number
  } = {}
): string {
  const {
    locale = 'en-US',
    decimals = 2
  } = options;

  try {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value)
  } catch (error) {
    // Fallback if Intl fails
    return value.toFixed(decimals)
  }
}

/**
 * Format percentage
 */
export function formatPercentage(
  value: number,
  options: {
    decimals?: number;
    showSign?: boolean
  } = {}
): string {
  const {
    decimals = 1,
    showSign = false
  } = options;

  const sign = showSign && value > 0 ? '+' : '';
  return `${sign}${value.toFixed(decimals)}%`
}

/**
 * Abbreviate large numbers (e.g., 1000 -> 1K, 1000000 -> 1M)
 */
export function abbreviateNumber(value: number): string {
  if (value < 1000) {
    return value.toFixed(0)
  }

  const suffixes = ['', 'K', 'M', 'B', 'T'];
  const tier = Math.floor(Math.log10(Math.abs(value)) / 3);
  
  if (tier === 0) return value.toFixed(0);

  const suffix = suffixes[tier] || '';
  const scale = Math.pow(10, tier * 3);
  const scaled = value / scale;

  return scaled.toFixed(1) + suffix
}

/**
 * Parse currency string to number
 */
export function parseCurrency(value: string): number {
  // Remove currency symbols, commas, and spaces;
  const cleaned = value.replace(/[$,\s]/g, '');
  const parsed = parseFloat(cleaned);
  
  return isNaN(parsed) ? 0 : parsed
}

/**
 * Format time period (e.g., "per hour", "per year")
 */
export function formatTimePeriod(frequency: string): string {
  const periods: Record<string, string> = {
    hourly: 'per hour',
    daily: 'per day',
    weekly: 'per week',
    biweekly: 'per 2 weeks',
    monthly: 'per month',
    yearly: 'per year'
  };

  return periods[frequency] || frequency
}

/**
 * Capitalize first letter of string
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Format compact currency (e.g., $1.2K, $45.5K)
 */
export function formatCompactCurrency(
  amount: number,
  options: {
    currency?: string;
    locale?: string
  } = {}
): string {
  const {
    currency = 'USD',
    locale = 'en-US'
  } = options;

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(amount)
  } catch (error) {
    // Fallback
    const abbreviated = abbreviateNumber(amount);
    return `$${abbreviated}`
  }
}