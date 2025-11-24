import React, { useState, useCallback } from 'react';
import type { IncomeFrequency, IncomeCalculatorState } from './types/income.types';
import { calculateAllIncomes } from './utils/calculations';
import IncomeInput from './components/IncomeInput';
import FrequencySelector from './components/FrequencySelector';
import ResultsDisplay from './components/ResultsDisplay';

export default function App() {
  const [state, setState] = useState<IncomeCalculatorState>({
    input: {
      amount: 0,
      frequency: 'yearly'
    },
    calculated: null
  });

  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleAmountChange = useCallback((value: string) => {
    setInputValue(value);
    setError('');

    if (value === '' || value === '.') {
      setState(prev => ({
        ...prev,
        input: { ...prev.input, amount: 0 },
        calculated: null
      }));
      return
    };
    const numValue = parseFloat(value);

    if (isNaN(numValue)) {
      setError('Please enter a valid number');
      return
    };
    if (numValue < 0) {
      setError('Amount cannot be negative');
      return
    };
    if (numValue > 999999999) {
      setError('Amount is too large');
      return
    };
    try {
      const calculated = calculateAllIncomes(numValue, state.input.frequency);
      setState(prev => ({
        ...prev,
        input: { ...prev.input, amount: numValue },
        calculated
      }))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Calculation error')
    }
  }, [state.input.frequency]);

  const handleFrequencyChange = useCallback((frequency: IncomeFrequency) => {
    setState(prev => {
      const newInput = { ...prev.input, frequency };
      
      if (prev.input.amount > 0) {
        try {
          const calculated = calculateAllIncomes(prev.input.amount, frequency);
          return {
            input: newInput,
            calculated
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Calculation error');
          return {
            input: newInput,
            calculated: null
          }
        }
      }
      
      return {
        input: newInput,
        calculated: null
      }
    })
  }, []);

  return (
    <div className="app">
      <div className="app-container">
        <header className="app-header">
          <div className="header-content">
            <h1 className="app-title">Income Calculator</h1>
            <p className="app-subtitle">
              Calculate your income across different pay periods instantly
            </p>
          </div>
        </header>

        <main className="app-main">
          <div className="calculator-card">
            <div className="calculator-inputs">
              <IncomeInput
                value={inputValue}
                onChange={handleAmountChange}
                label="Income Amount"
                placeholder="Enter your income"
                error={error}
              />

              <FrequencySelector
                selected={state.input.frequency}
                onChange={handleFrequencyChange}
                label="Payment Frequency"
              />
            </div>

            {state.calculated && (
              <ResultsDisplay
                results={state.calculated}
                currentFrequency={state.input.frequency}
              />
            )}

            {!state.calculated && inputValue === '' && (
              <div className="empty-state">
                <svg
                  className="empty-state-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="empty-state-title">Ready to Calculate</h3>
                <p className="empty-state-text">
                  Enter your income amount and select a payment frequency to see conversions across all time periods
                </p>
              </div>
            )}
          </div>
        </main>

        <footer className="app-footer">
          <p className="footer-text">
            Calculations assume {40} hours per week, {52} weeks per year
          </p>
        </footer>
      </div>
    </div>
  )
}