export default function validateDag(nodes, edges) {
  if (nodes.length < 2) {
    return { isValid: false, message: 'Add at least 2 nodes' };
  }

  const graph = {};
  nodes.forEach((n) => (graph[n.id] = []));
  edges.forEach((e) => graph[e.source].push(e.target));

  const visited = {};
  const recStack = {};

  const hasCycle = (nodeId) => {
    if (!visited[nodeId]) {
      visited[nodeId] = true;
      recStack[nodeId] = true;
      for (const neighbor of graph[nodeId]) {
        if (!visited[neighbor] && hasCycle(neighbor)) return true;
        else if (recStack[neighbor]) return true;
      }
    }
    recStack[nodeId] = false;
    return false;
  };

  for (const nodeId in graph) {
    if (hasCycle(nodeId)) {
      return { isValid: false, message: 'Cycle detected' };
    }
  }

  const allConnected = nodes.every((node) =>
    edges.some((e) => e.source === node.id || e.target === node.id)
  );

  if (!allConnected) return { isValid: false, message: 'Some nodes are not connected' };

  return { isValid: true, message: 'Valid DAG ✅' };
}
