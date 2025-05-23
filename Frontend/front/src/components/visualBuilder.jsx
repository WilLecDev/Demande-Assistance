import React, { useCallback, useState } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  MiniMap,
  Controls,
  Background,
} from "react-flow-renderer";

import "../styles/visualBuilder.css";

let id = 0;
const getId = () => `node_${id++}`;

export default function VisualScenarioBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("type");
      const label = event.dataTransfer.getData("label");

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type: "default",
        position,
        data: { label: `${type === "question" ? "❓" : "⚙️"} ${label}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div className="visual-scenario-builder">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <MiniMap />
            <Controls />
            <Background color="#aaa" gap={16} />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

