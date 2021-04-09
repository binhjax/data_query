import { Select } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Node, Edge, ArrowHeadType } from 'react-flow-renderer';
import { v4 as uuidv4 } from 'uuid';
import * as action from '../../../../actions/join';
import { Card } from 'antd';

const JoinTypeProperty = (props) => {
    const selectedNode = useSelector((state: any) => state.sqlDiagram.selectedNode);
    const elements = useSelector((state: any) => state.sqlDiagram.joinElements);


    const dispatch = useDispatch();

    const findElement = (id) => {
        return elements.find((element) => element.id === id);
    };

    const tables = elements.filter((el) => el.type === 'table');
    const joinNodes = elements.filter((el) => el.type === 'joinType');


    const findChildren = (id) => {
        return joinNodes.map((el) => {
            if (el.data.table1 == id || el.data.table2 == id) {
                return el.data.result
            }
            return null
        }).filter((el) => el != null)
    }

    const findAllChildren = (id) => {
        console.log("binhnt.injections.SqlSupport.components.Join.components.ElementProperty: findAllChildren=", id)
        var ret = [id]
        var children = findChildren(id)
        console.log("binhnt.injections.SqlSupport.components.Join.components.ElementProperty: children=", children)
        if (children.length > 0) {
            children.forEach((el) => {
                var subchildren = findAllChildren(el)
                if (subchildren.length > 0) {
                    ret = ret.concat(subchildren)
                }
            })
        }

        return ret
    }
    //binhnt: Remove all children
    var excludes = findAllChildren(selectedNode.data?.result)

    const table1 = findElement(selectedNode?.data?.table1);
    const table2 = findElement(selectedNode?.data?.table2);

    //binhnt: Remove table1
    excludes = excludes.concat(selectedNode?.data?.table1)

    console.log("binhnt.injections.SqlSupport.components.Join.components.ElementProperty: excludes=", excludes)
    const data = tables.filter((el) => !excludes.includes(el.id))

    const findValue = (label) => {
        return data.find((element) => element.data.label === label);
    };

    const join_data = [
        'inner-join',
        'full-outer-join',
        'left-outer-join',
        'right-outer-join',
        'full-anti-join',
        'left-anti-join',
        'right-anti-join',
    ];

    const handleSelectJoinType = (value) => {
        console.log("handleSelectJoinType: value ", value)
    }

    const handleSelectTable = (value) => {
        const item = JSON.parse(value);
        console.log("binhnt.injections.SqlSupport.components.Join.component.ElementProperty.JoinTypeProperty: ", item);

        if (!table2) {
            console.log("binhnt.injections.SqlSupport.components.Join.component.ElementProperty.JoinTypeProperty: Add link to table ");

            // const newNodeId = uuidv4();
            // const newNode: Node = {
            //     id: newNodeId,
            //     position: { x: table1?.position.x + 600, y: table1?.position.y },
            //     type: 'join',
            //     data: item.data,
            // };

            const link: Edge = {
                id: uuidv4(),
                source: item.id,
                target: selectedNode?.id,
                sourceHandle: 'bottom',
                targetHandle: 'top',
                type: 'step',
                style: { stroke: 'blue' },
                labelStyle: { fontSize: 14, fontWeight: 700 },
                arrowHeadType: ArrowHeadType.ArrowClosed
            };
            const newEls = elements.concat(link);
            dispatch(action.setElements(newEls));

            selectedNode.data.table2 = item.id;
            dispatch(action.setJoin(selectedNode));

        } else {
            console.log("binhnt.injections.SqlSupport.components.Join.component.ElementProperty.JoinTypeProperty: set data with table2.id");

            dispatch(action.setData(item.data, table2?.id));
        }
    };

    return (
        <>
            <div>
                Join type:
                <Select
                    style={{ minWidth: 40 }}
                    onSelect={handleSelectJoinType}
                    disabled={!table1}
                    value={selectedNode?.data?.label}
                >
                    {
                        join_data.map((item, index) => (
                            <Select.Option value={item} key={index}>
                                {item}
                            </Select.Option>
                        ))}
                </Select>
            </div>
            <div>Table1: {table1?.data?.label}</div>
            {
                console.log(findValue(table2))
            }
            <div>
                Table2:
                    <Select style={{ minWidth: 100 }} onSelect={handleSelectTable} disabled={!table1}>
                    {
                        data.map((item, index) => (
                            <Select.Option value={JSON.stringify(item)} key={index}>
                                {item.data?.label}
                            </Select.Option>
                        ))
                    }
                </Select>
            </div>
            <div>Result: </div>
        </>
    )
};

export default JoinTypeProperty;
