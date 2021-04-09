import { Divider, Select } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Node, Edge } from 'react-flow-renderer';
import { v4 as uuidv4 } from 'uuid';
import * as action from '../../../../actions/join';

import AceEditorWrapper from '../../../AceEditorWrapper';

import { Card } from 'antd';


const TableProperty = (props) => {
    const selectedNode = useSelector((state: any) => state.sqlDiagram.selectedNode);

    const dispatch = useDispatch();
    console.log("TableProperty: selectedNode: ", selectedNode)
    const { data } = selectedNode;
    return (
        <>
            <Divider>Selection</Divider>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <Divider>Condition</Divider>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            {
                /* <AceEditorWrapper
                    actions={this.props.actions}
                    autocomplete={this.state.autocompleteEnabled}
                    onBlur={this.setQueryEditorSql}
                    onChange={this.onSqlChanged}
                    queryEditor={this.props.queryEditor}
                    sql={this.props.queryEditor.sql}
                    schemas={this.props.queryEditor.schemaOptions}
                    tables={this.props.queryEditor.tableOptions}
                    functionNames={this.props.queryEditor.functionNames}
                    extendedTables={this.props.tables}
                    height={`${aceEditorHeight}px`}
                    hotkeys={hotkeys}
                /> */
            }
        </>
    )
};

export default TableProperty;
