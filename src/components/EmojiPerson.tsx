import React from 'react';

interface EmojiPersonProps {
  className?: string;
  style?: React.CSSProperties;
}

export const EmojiPerson: React.FC<EmojiPersonProps> = ({ className = '', style = {} }) => {
  return (
    <span 
      className={className}
      style={{
        fontSize: '48px',
        lineHeight: '48px',
        display: 'inline-block',
        ...style
      }}
    >
      👱
    </span>
  );
};