import React, { FC } from 'react';
import './index.css';
import { NodeProps, Handle, Position } from 'react-flow-renderer';
import { useDispatch } from 'react-redux';
import * as action from '../../../../actions/join';

const JoinTypeElement: FC<NodeProps> = (props) => {
  const dispatch = useDispatch();
  return (
    <>
      <div
        onClick={() => {
          dispatch(action.setJoin(props));
        }}
      >
        <Handle type='target' position={Position.Top} id='top' className='element_port' />
        <Handle type='source' position={Position.Bottom} id='bottom' className='element_port' />

        <img
          src={require(`../../images/sql-join/${props.data?.label}.png`)}
          draggable={false}
          className='joinType'
        />
      </div>
    </>
  );
};
export default JoinTypeElement;
