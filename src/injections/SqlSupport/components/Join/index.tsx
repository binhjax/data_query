import React, { useState, DragEvent } from 'react';
import ReactFlow, { ReactFlowProvider, Controls, OnLoadParams, Node } from 'react-flow-renderer';

import { useDispatch, useSelector } from 'react-redux';
import * as action from '../../actions/join';
import CustomEdge from './components/CustomEdge';
import JoinElement from './components/JoinElement';
import JoinTypeElement from './components/JoinTypeElement';
// import DefaultLayout from './layouts/joinLayout';
import { v4 as uuidv4 } from 'uuid';

const nodeTypes = {
  join: JoinElement,
  joinType: JoinTypeElement,
};
const edgeTypes = {
  custom: CustomEdge,
};

const onDragOver = (event: DragEvent) => {
  event.preventDefault();
  event.stopPropagation();

  event.dataTransfer.dropEffect = 'move';
};

const Diagram = () => {
  const [reactFlowInstance, setReactFlowInstance] = useState<OnLoadParams>();
  // const elements = useSelector((state: any) => state.join.joinElements);
  const elements = [];

  const dispatch = useDispatch();
  const onLoad = (_reactFlowInstance: OnLoadParams) => setReactFlowInstance(_reactFlowInstance);

  const onDrop = (event: DragEvent) => {
    event.preventDefault();

    if (reactFlowInstance) {
      const node = JSON.parse(event.dataTransfer.getData('application/reactflow'));
      const id = uuidv4();
      const newNode: Node = {
        id: id,
        position: { x: event.clientX - 400, y: event.clientY - 120 },
        type: node.type,
        data: node.data,
      };
      dispatch(action.addNode(newNode));
    }
  };

  const handleClick = (e, el) => {
    dispatch(action.setSelectedNode(el));
  };

  console.log('binhnt.diagram');

  return (

    <div className='dndflow'>
      <div className='content' id='flow'>
        <ReactFlowProvider>
          <div className='reactflow-wrapper'>
            <ReactFlow
              onElementClick={handleClick}
              elements={elements}
              onLoad={onLoad}
              onDrop={onDrop}
              onDragOver={onDragOver}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
            >
              <Controls />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default Diagram;
