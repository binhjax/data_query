import Checkbox from 'antd/lib/checkbox/Checkbox';
import React, { memo, FC } from 'react';
import { NodeProps, Handle, Position, Node, Edge, ArrowHeadType } from 'react-flow-renderer';
import { Popover, Button, Row, Col } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import full_anti_join from '../../images/sql-join/full-anti-join.png';
import full_outer_join from '../../images/sql-join/full-outer-join.png';
import inner_join from '../../images/sql-join/inner-join.png';
import left_anti_join from '../../images/sql-join/left-anti-join.png';
import right_anti_join from '../../images/sql-join/right-anti-join.png';
import left_outer_join from '../../images/sql-join/left-outer-join.png';
import right_outer_join from '../../images/sql-join/right-outer-join.png';
import './index.css';


import { useDispatch, useSelector } from 'react-redux';

import * as action from '../../../../actions/join';
import { v4 as uuidv4 } from 'uuid';
const data = [
  {
    name: 'inner-join',
    img: inner_join,
  },

  {
    name: 'full-outer-join',
    img: full_outer_join,
  },
  {
    name: 'left-outer-join',
    img: left_outer_join,
  },
  {
    name: 'right-outer-join',
    img: right_outer_join,
  },
  {
    name: 'full-anti-join',
    img: full_anti_join,
  },
  {
    name: 'left-anti-join',
    img: left_anti_join,
  },
  {
    name: 'right-anti-join',
    img: right_anti_join,
  },
];

const JoinElement: FC<NodeProps> = (props) => {
  // const elements = useSelector((state: any) => state.join.joinElements);
  const elements = [];

  const dispatch = useDispatch();
  const setJoin = (name) => {
    // create result table
    const newNodeId = uuidv4();
    const newNode: Node = {
      id: newNodeId,
      type: 'join',
      data: props.data,
      position: { x: props.xPos + 200, y: props.yPos + 400 },
    };
    // create join node
    const joinNodeId = uuidv4();
    const joinNode: Node = {
      id: joinNodeId,
      type: 'joinType',
      data: {
        label: name,
        table1: props.id,
        table2: '',
        result: newNodeId,
      },
      position: { x: props.xPos + 200, y: props.yPos + 200 },
    };
    // create link from current table to join node
    const link1: Edge = {
      id: uuidv4(),
      source: props.id,
      target: joinNodeId,
      sourceHandle: 'bottom',
      targetHandle: 'top',
      type: 'step',
      labelStyle: { fontSize: 14, fontWeight: 700 },
    };
    // create link from join node to result table
    const link2: Edge = {
      id: uuidv4(),
      source: joinNodeId,
      target: newNodeId,
      sourceHandle: 'bottom',
      targetHandle: 'top',
      type: 'step',
      labelStyle: { fontSize: 14, fontWeight: 700 },
      arrowHeadType: ArrowHeadType.Arrow,
    };
    const els = elements.concat(joinNode, newNode, link1, link2);
    dispatch(action.setElements(els));
  };

  const content = (
    <Row>
      {data.map((item, index) => (
        <Col md={8} key={index} className='join-element' onClick={() => setJoin(item.name)}>
          <img src={item.img} style={{ width: 23, height: 20 }} />
        </Col>
      ))}
    </Row>
  );
  return (
    <>
      <div className='element'>
        <Handle type='target' position={Position.Top} id='top' className='element_port' />

        <div className='element_popover'>
          <Popover placement='rightBottom' content={content} trigger='focus'>
            <Button
              type='ghost'
              style={{ border: 'none' }}
              icon={<MoreOutlined className='more-button' />}
            />
          </Popover>
        </div>
        <div className='element_header'>
          <div className='element_header_text'>{props.data.label}</div>
        </div>
        {props.data.columns.map((item, index) => (
          <>
            <div className='element_row' key={index}>
              {item.key === 'pk' ? (
                <>
                  <div className='element_property' style={{ fontWeight: 700 }}>
                    <div style={{ color: '#000' }}>{item.name}</div>
                    <Checkbox />
                  </div>
                </>
              ) : (
                ''
              )}
            </div>
          </>
        ))}
        {props.data.columns.map((item, index) => (
          <>
            <div className='element_row' key={index}>
              {item.key !== 'pk' ? (
                <>
                  <div className='element_property'>
                    <div>{item.name}</div>
                    <Checkbox />
                  </div>
                </>
              ) : (
                ''
              )}
            </div>
          </>
        ))}

        <Handle type='source' position={Position.Bottom} id='bottom' className='element_port' />
      </div>
    </>
  );
};

export default memo(JoinElement);
