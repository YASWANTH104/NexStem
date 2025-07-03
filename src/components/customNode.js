import React from 'react';
import { Handle, Position } from 'reactflow';

export default function CustomNode({ data }) {
  return (
    <div style={{ padding: 10, border: '2px solid #555', borderRadius: 5, background: '#fff' }}>
      <Handle type="target" position={Position.Left} />
      <div>{data.label}</div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
