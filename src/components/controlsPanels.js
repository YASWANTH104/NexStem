import React from 'react';

export default function ControlsPanel({ onAddNode, onAutoLayout }) {
  return (
    <div style={{ position: 'absolute', zIndex: 10, padding: 10 }}>
      <button onClick={onAddNode}>Add Node</button>
      <button onClick={onAutoLayout} style={{ marginLeft: 10 }}>
        Auto Layout
      </button>
    </div>
  );
}
