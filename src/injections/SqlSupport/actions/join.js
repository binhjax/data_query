export const SET_JOIN = 'SET_JOIN';
export const SET_JOIN_ELEMENTS = 'SET_JOIN_ELEMENTS';
export const ADD_JOIN_NODE = 'ADD_JOIN_NODE';
export const SET_SELECTED_NODE = 'SET_SELECTED_NODE';
export const SET_SELECTED_COLUMN = 'SET_SELECTED_COLUMN';
export const SET_JOIN_DATA = 'SET_JOIN_DATA';
export const SET_COLUMNS = 'SET_COLUMNS';
export const SET_SCHEMA = 'SET_SCHEMA';
export const SET_DISPLAY = 'SET_DISPLAY';

export const setJoin = (join) => async (dispatch) => {
  dispatch({
    type: 'SET_JOIN',
    join: join,
  });
};
export const setElements = (joinElements) => async (dispatch) => {
  console.log('2');
  dispatch({
    type: 'SET_JOIN_ELEMENTS',
    joinElements: joinElements,
  });
};

export const addNode = (node) => async (dispatch) => {
  console.log("binhnt.injections.SqlSupport.actions.join.AddNode")
  dispatch({
    type: 'ADD_JOIN_NODE',
    node: node,
  });
};
export const setSelectedNode = (node) => async (dispatch) => {
  dispatch({
    type: 'SET_SELECTED_NODE',
    node: node,
  });
  dispatch(setSelectedColumn({}));
};

export const setSelectedColumn = (column) => async (dispatch) => {
  dispatch({
    type: 'SET_SELECTED_COLUMN',
    column: column,
  });
};

export const setData = (data, id) => async (dispatch) => {
  dispatch({
    type: 'SET_JOIN_DATA',
    data: data,
    id: id,
  });
};

export const setColumns = (columns, id) => async (dispatch) => {
  dispatch({
    type: 'SET_COLUMNS',
    columns: columns,
    id: id,
  });
};

export const setSchema = (schema) => async (dispatch) => {
  dispatch({
    type: 'SET_SCHEMA',
    schema: schema,
  });
};
export const setDisplay = () => async (dispatch) => {
  dispatch({
    type: 'SET_DISPLAY',
  });
};
