import React, { useCallback, useState, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';

import CustomNode from './components/CustomNode';
import ControlsPanel from './components/ControlsPanel';
import ValidationStatus from './components/ValidationStatus';
import validateDag from './utils/validateDag';
import autoLayout from './layout/autoLayout';

const nodeTypes = {
  custom: CustomNode
};

let id = 0;
const getId = () => `node_${id++}`;

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isValidDag, setIsValidDag] = useState(true);
  const [validationMessage, setValidationMessage] = useState('');

  const onConnect = useCallback((params) => {
    if (params.source === params.target) return;

    const newEdge = {
      ...params,
      markerEnd: {
        type: MarkerType.ArrowClosed
      }
    };
    setEdges((eds) => addEdge(newEdge, eds));
  }, [setEdges]);

  const addNode = () => {
    const label = prompt('Enter node label:');
    if (!label) return;
    const newNode = {
      id: getId(),
      type: 'custom',
      data: { label },
      position: { x: Math.random() * 400, y: Math.random() * 400 }
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Delete') {
      setNodes((nds) => nds.filter((n) => !n.selected));
      setEdges((eds) =>
        eds.filter(
          (e) => !e.selected && !nodes.find((n) => n.id === e.source || n.id === e.target)
        )
      );
    }
  }, [nodes]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const { isValid, message } = validateDag(nodes, edges);
    setIsValidDag(isValid);
    setValidationMessage(message);
  }, [nodes, edges]);

  const handleAutoLayout = () => {
    const laidOut = autoLayout(nodes, edges);
    setNodes(laidOut);
  };

  return (
    <div style={{ height: '100vh' }}>
      <ReactFlowProvider>
        <ControlsPanel onAddNode={addNode} onAutoLayout={handleAutoLayout} />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
        <ValidationStatus isValid={isValidDag} message={validationMessage} />
      </ReactFlowProvider>
    </div>
  );
}

export default App;
