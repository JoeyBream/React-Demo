import React from 'react';
import { avatarBase64 } from '../assets/avatar';

interface AvatarProps {
  className?: string;
  style?: React.CSSProperties;
}

export const Avatar: React.FC<AvatarProps> = ({ className = '', style = {} }) => {
  return (
    <img 
      src={avatarBase64}
      alt="Avatar"
      className={className}
      style={{
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        objectFit: 'cover',
        ...style
      }}
    />
  );
};