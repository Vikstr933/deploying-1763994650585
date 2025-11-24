import React from 'react';
import './IncomeInput.css';

interface IncomeInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  error?: string
}

export default function IncomeInput({
  value,
  onChange,
  label = 'Income Amount',
  placeholder = 'Enter amount',
  error
}: IncomeInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Allow empty string, numbers, and decimal point
    if (inputValue === '' || /^\d*\.?\d*$/.test(inputValue)) {
      onChange(inputValue)
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select()
  };

  return (
    <div className="income-input-container">
      {label && (
        <label htmlFor="income-input" className="income-input-label">
          {label}
        </label>
      )}
      <div className="income-input-wrapper">
        <span className="income-input-currency">$</span>
        <input
          id="income-input"
          type="text"
          inputMode="decimal"
          className={`income-input ${error ? 'income-input-error' : ''}`}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder={placeholder}
          aria-label={label}
          aria-invalid={!!error}
          aria-describedby={error ? 'income-input-error' : undefined}
        />
      </div>
      {error && (
        <p id="income-input-error" className="income-input-error-message" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}