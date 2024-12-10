import React from 'react';

interface CounterProps {
  title: string;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const Counter: React.FC<CounterProps> = ({ title, count, onIncrement, onDecrement }) => {
  return (
    <div className="counter-card">
      <h2>{title}</h2>
      <div className="counter">
        <button onClick={onDecrement}>-</button>
        <span>{count}</span>
        <button onClick={onIncrement}>+</button>
      </div>
    </div>
  );
};