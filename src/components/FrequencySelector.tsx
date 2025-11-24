import React from 'react';
import type { IncomeFrequency } from '../types/income.types';
import { FREQUENCY_LABELS } from '../types/income.types';
import './FrequencySelector.css';

interface FrequencySelectorProps {
  selected: IncomeFrequency;
  onChange: (frequency: IncomeFrequency) => void;
  label?: string
}

const frequencies: IncomeFrequency[] = [
  'hourly',
  'daily',
  'weekly',
  'biweekly',
  'monthly',
  'yearly'
];

export default function FrequencySelector({
  selected,
  onChange,
  label = 'Payment Frequency'
}: FrequencySelectorProps) {
  const handleChange = (frequency: IncomeFrequency) => {
    onChange(frequency)
  };

  const handleKeyDown = (e: React.KeyboardEvent, frequency: IncomeFrequency) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleChange(frequency)
    }
  };

  return (
    <div className="frequency-selector-container">
      {label && (
        <label className="frequency-selector-label">
          {label}
        </label>
      )}
      <div className="frequency-selector-grid" role="radiogroup" aria-label={label}>
        {frequencies.map((frequency) => {
          const isSelected = frequency === selected;
          const frequencyLabel = FREQUENCY_LABELS[frequency];

          return (
            <button
              key={frequency}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={`frequency-option ${isSelected ? 'frequency-option-selected' : ''}`}
              onClick={() => handleChange(frequency)}
              onKeyDown={(e) => handleKeyDown(e, frequency)}
              tabIndex={isSelected ? 0 : -1}
            >
              <span className="frequency-option-icon">
                {isSelected ? '●' : '○'}
              </span>
              <span className="frequency-option-text">
                {frequencyLabel}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}