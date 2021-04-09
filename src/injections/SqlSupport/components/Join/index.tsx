import React, { useState, DragEvent } from 'react';
import ReactFlow, { ReactFlowProvider, Controls, OnLoadParams, Node, Elements, removeElements } from 'react-flow-renderer';

import { bindActionCreators } from 'redux';
import { useDispatch, useSelector, connect } from 'react-redux';

import * as Actions from '../../actions/join';
import CustomEdge from './components/CustomEdge';
import JoinElement from './components/JoinElement';
import JoinTypeElement from './components/JoinTypeElement';
import PropertyEditor from './components/ElementProperty';

import { Layout, Row } from 'antd';
import { styled } from '@superset-ui/core';

const StyledLayout = styled(Layout)`
   .ant-layout {
    flex-direction: row;
   }
`

// import DefaultLayout from './layouts/joinLayout';
import { v4 as uuidv4 } from 'uuid';

const nodeTypes = {
  table: JoinElement,
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
  const elements = useSelector((state: any) => {
    const { sqlDiagram } = state;
    if (sqlDiagram != undefined) {
      return sqlDiagram.joinElements
    }
    return [];
  });

  const [uid, setUid] = useState(0)
  const [tables, setTables] = useState<Array<Object>>([])
  const [displaySidebar, setDisplaySidebar] = useState<Boolean>(false)


  const dispatch = useDispatch();


  const onLoad = (_reactFlowInstance: OnLoadParams) => setReactFlowInstance(_reactFlowInstance);

  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    console.log("Binhnt: drop data ");
    if (reactFlowInstance) {
      const table = JSON.parse(event.dataTransfer.getData('application/reactflow'));
      console.log("Binhnt: drop data table: ", table);
      var newTables = tables.concat(table)
      setTables(newTables)

      const id = uuidv4();
      const { name, columns } = table;

      const cuid = uid;
      const newNode: Node = {
        id: id,
        position: { x: event.clientX - 400, y: event.clientY - 120 },
        type: "table",
        data: {
          label: name + "_" + cuid,
          name: name,
          columns: columns
        },
      };
      setUid(cuid + 1)
      // console.log("Dispatch function: action.addNode ")
      dispatch(Actions.addNode(newNode));
      var newElements = elements.concat(newNode)
      // setElements(newElements)
    }
  };

  const handleClick = (e, el) => {
    // console.log("On element selected: ", el)
    dispatch(Actions.setSelectedNode(el));
    setDisplaySidebar(true);
  };

  const handleElemensRemove = (els) => {
    // console.log('binhnt.diagram: handleElemensRemove', els);
    var newElements = removeElements(els, elements)
    dispatch(Actions.setElements(newElements));
  }

  return (
    <Row style={{
      // display: 'flex',
      height: '100%',
    }} >
      <ReactFlowProvider >
        <div className='reactflow-wrapper' style={{
          height: '100%',
          border: 'solid 1px rgb(223 224 224)',
          width: displaySidebar ? '80%' : '100%'
        }} >
          <ReactFlow
            onElementClick={handleClick}
            elements={elements}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onElementsRemove={handleElemensRemove}
          >
            <Controls />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
      <PropertyEditor open={displaySidebar} setDisplaySidebar={setDisplaySidebar} />
    </Row>
  );
};

function mapStateToProps(state, props) {
  // const { sqlSupport } = state;
  // console.log("binhnt.injections.SqlSupport.components.Join.index.mapStateToProps: ", state)
  return { ...props };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Diagram);
