export type IncomeFrequency = 'hourly' | 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'yearly';

export interface IncomeInput {
  amount: number;
  frequency: IncomeFrequency
}

export interface CalculatedIncome {
  hourly: number;
  daily: number;
  weekly: number;
  biweekly: number;
  monthly: number;
  yearly: number
}

export interface IncomeCalculatorState {
  input: IncomeInput;
  calculated: CalculatedIncome | null
}

export const FREQUENCY_LABELS: Record<IncomeFrequency, string> = {
  hourly: 'Hourly',
  daily: 'Daily',
  weekly: 'Weekly',
  biweekly: 'Bi-weekly',
  monthly: 'Monthly',
  yearly: 'Yearly'
};

export const HOURS_PER_WEEK = 40;
export const WEEKS_PER_YEAR = 52;
export const DAYS_PER_WEEK = 5;
export const MONTHS_PER_YEAR = 12;