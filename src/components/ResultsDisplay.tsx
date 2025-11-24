import React from 'react';
import type { CalculatedIncome, IncomeFrequency } from '../types/income.types';
import { FREQUENCY_LABELS } from '../types/income.types';
import { formatCurrency } from '../utils/formatters';
import './ResultsDisplay.css';

interface ResultsDisplayProps {
  results: CalculatedIncome | null;
  currentFrequency: IncomeFrequency
}

interface ResultCardProps {
  frequency: IncomeFrequency;
  amount: number;
  isHighlighted: boolean
}

function ResultCard({ frequency, amount, isHighlighted }: ResultCardProps) {
  const label = FREQUENCY_LABELS[frequency];
  const formattedAmount = formatCurrency(amount, { decimals: 2 });

  return (
    <div className={`result-card ${isHighlighted ? 'result-card-highlighted' : ''}`}>
      <div className="result-card-header">
        <span className="result-card-label">{label}</span>
        {isHighlighted && (
          <span className="result-card-badge" aria-label="Current selection">
            Current
          </span>
        )}
      </div>
      <div className="result-card-amount">
        {formattedAmount}
      </div>
    </div>
  )
}

export default function ResultsDisplay({ results, currentFrequency }: ResultsDisplayProps) {
  if (!results) {
    return (
      <div className="results-empty">
        <div className="results-empty-icon">💰</div>
        <p className="results-empty-text">Enter an amount to see calculations</p>
      </div>
    )
  }

  const frequencies: IncomeFrequency[] = [
    'hourly',
    'daily',
    'weekly',
    'biweekly',
    'monthly',
    'yearly'
  ];

  return (
    <div className="results-container">
      <div className="results-header">
        <h2 className="results-title">Your Income Breakdown</h2>
        <p className="results-subtitle">
          Based on a standard 40-hour work week
        </p>
      </div>

      <div className="results-grid">
        {frequencies.map((frequency) => (
          <ResultCard
            key={frequency}
            frequency={frequency}
            amount={results[frequency]}
            isHighlighted={frequency === currentFrequency}
          />
        ))}
      </div>

      <div className="results-footer">
        <p className="results-note">
          💡 Calculations assume 40 hours/week, 52 weeks/year, and 5 days/week
        </p>
      </div>
    </div>
  )
}