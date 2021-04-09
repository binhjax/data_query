import { Card, Select } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableProperty from './TableProperty';
import JoinTypeProperty from './JoinTypeProperty';
import { Layout, Menu, Breadcrumb } from 'antd';

const ElementProperty = (props) => {

  const selectedNode = useSelector((state: any) => state.sqlDiagram.selectedNode);

  const handleOnClick = () => {
    console.log("binhnt. Not display side bar  ")
    const { setDisplaySidebar } = props;
    if (setDisplaySidebar !== undefined) {
      setDisplaySidebar(false);
    }
  }

  return (
    <Layout className={props.open ? 'sidebar' : 'sidebar collapse'} >
      <Card title={selectedNode.data?.label} extra={<a onClick={handleOnClick}>Hide</a>} style={{ minWidth: 200 }}>
        {
          selectedNode?.type == "table" && <TableProperty />
        }
        {
          selectedNode?.type == "joinType" && <JoinTypeProperty />
        }
      </Card>
    </Layout>
  );
};

export default ElementProperty;
