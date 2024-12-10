import React from 'react';
import { EmojiPerson } from './EmojiPerson';

interface FlyingPeopleProps {
  people: { id: number; left: number; delay: number; }[];
}

export const FlyingPeople: React.FC<FlyingPeopleProps> = ({ people }) => {
  return (
    <div className="people-landing-zone">
      {people.map((person) => (
        <div 
          key={person.id} 
          className="flying-person"
          style={{
            animationDelay: `${person.delay}s`,
            left: `${person.left}%`
          }}
        >
          <EmojiPerson />
        </div>
      ))}
    </div>
  );
};