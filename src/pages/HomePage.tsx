import React, { useState, useCallback } from 'react';
import { Counter } from '../components/Counter';
import { FlyingPeople } from '../components/FlyingPeople';

export function HomePage() {
  const [peopleCount, setPeopleCount] = useState(0);
  const [visitorsCount, setVisitorsCount] = useState(0);
  const [happinessCount, setHappinessCount] = useState(0);
  const [flyingPeople, setFlyingPeople] = useState<{ id: number; left: number; delay: number; }[]>([]);

  const addPerson = useCallback(() => {
    setPeopleCount(prev => prev + 1);
    const newPerson = {
      id: Date.now(),
      left: Math.random() * 100,
      delay: Math.random() * 0.5
    };
    setFlyingPeople(prev => [...prev, newPerson]);
  }, []);

  const removePerson = useCallback(() => {
    if (peopleCount > 0) {
      setPeopleCount(prev => prev - 1);
      setFlyingPeople(prev => prev.slice(0, -1));
    }
  }, [peopleCount]);

  return (
    <div className="content">
      <h1 className="main-title">Welcome to Joeytown</h1>
      
      <div className="counter-section">
        <Counter
          title="People"
          count={peopleCount}
          onIncrement={addPerson}
          onDecrement={removePerson}
        />
        
        <Counter
          title="Visitors"
          count={visitorsCount}
          onIncrement={() => setVisitorsCount(prev => prev + 1)}
          onDecrement={() => setVisitorsCount(prev => Math.max(0, prev - 1))}
        />
        
        <Counter
          title="Happiness"
          count={happinessCount}
          onIncrement={() => setHappinessCount(prev => prev + 1)}
          onDecrement={() => setHappinessCount(prev => Math.max(0, prev - 1))}
        />
      </div>

      <FlyingPeople people={flyingPeople} />
    </div>
  );
}