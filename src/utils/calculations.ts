import type { IncomeFrequency, CalculatedIncome } from '../types/income.types';
import { HOURS_PER_WEEK, WEEKS_PER_YEAR, DAYS_PER_WEEK, MONTHS_PER_YEAR } from '../types/income.types';

/**
 * Calculate all income frequencies from a given amount and frequency
 */
export function calculateAllIncomes(
  amount: number,
  frequency: IncomeFrequency
): CalculatedIncome {
  if (amount < 0) {
    throw new Error('Amount cannot be negative')
  }

  // First convert to yearly income as base;
  const yearly = convertToYearly(amount, frequency);

  // Then calculate all other frequencies from yearly
  return {
    hourly: yearly / (WEEKS_PER_YEAR * HOURS_PER_WEEK),
    daily: yearly / (WEEKS_PER_YEAR * DAYS_PER_WEEK),
    weekly: yearly / WEEKS_PER_YEAR,
    biweekly: yearly / (WEEKS_PER_YEAR / 2),
    monthly: yearly / MONTHS_PER_YEAR,
    yearly
  }
}

/**
 * Convert any frequency to yearly income
 */
function convertToYearly(amount: number, frequency: IncomeFrequency): number {
  switch (frequency) {
    case 'hourly':
      return amount * HOURS_PER_WEEK * WEEKS_PER_YEAR;
    case 'daily':
      return amount * DAYS_PER_WEEK * WEEKS_PER_YEAR;
    case 'weekly':
      return amount * WEEKS_PER_YEAR;
    case 'biweekly':
      return amount * (WEEKS_PER_YEAR / 2);
    case 'monthly':
      return amount * MONTHS_PER_YEAR;
    case 'yearly':
      return amount;
    default:
      throw new Error(`Unknown frequency: ${frequency}`)
  }
}

/**
 * Calculate percentage difference between two amounts
 */
export function calculatePercentageDifference(
  current: number,
  previous: number
): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100
}

/**
 * Round to specified decimal places
 */
export function roundToDecimals(value: number, decimals: number = 2): number {
  const multiplier = Math.pow(10, decimals);
  return Math.round(value * multiplier) / multiplier
}

/**
 * Calculate tax amount based on percentage
 */
export function calculateTax(amount: number, taxRate: number): number {
  if (taxRate < 0 || taxRate > 100) {
    throw new Error('Tax rate must be between 0 and 100')
  }
  return amount * (taxRate / 100)
}

/**
 * Calculate net income after tax
 */
export function calculateNetIncome(grossIncome: number, taxRate: number): number {
  const tax = calculateTax(grossIncome, taxRate);
  return grossIncome - tax
}