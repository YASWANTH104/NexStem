import React from 'react';

export default function ValidationStatus({ isValid, message }) {
  return (
    <div style={{
      position: 'absolute',
      bottom: 10,
      left: 10,
      background: isValid ? '#e0ffe0' : '#ffe0e0',
      padding: '8px 12px',
      borderRadius: 5,
      color: isValid ? 'green' : 'red',
      fontWeight: 'bold'
    }}>
      {message}
    </div>
  );
}
