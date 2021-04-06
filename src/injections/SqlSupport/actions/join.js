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
