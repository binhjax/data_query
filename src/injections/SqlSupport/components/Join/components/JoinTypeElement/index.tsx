import React, { FC } from 'react';
import './index.css';
import { NodeProps, Handle, Position } from 'react-flow-renderer';
import { useDispatch } from 'react-redux';
import * as action from '../../../../actions/join';

import full_anti_join from '../../images/sql-join/full-anti-join.png';
import full_outer_join from '../../images/sql-join/full-outer-join.png';
import inner_join from '../../images/sql-join/inner-join.png';
import left_anti_join from '../../images/sql-join/left-anti-join.png';
import right_anti_join from '../../images/sql-join/right-anti-join.png';
import left_outer_join from '../../images/sql-join/left-outer-join.png';
import right_outer_join from '../../images/sql-join/right-outer-join.png';


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
          src={full_anti_join}
          draggable={false}
          className='joinType'
        />
        {/* <img
          src={require(`../../images/sql-join/${props.data?.label}.png`)}
          draggable={false}
          className='joinType'
        /> */}
      </div>
    </>
  );
};
export default JoinTypeElement;
