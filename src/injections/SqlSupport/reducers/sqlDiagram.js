import { t } from '@superset-ui/core';

const initialState = {
  joinElements: [],  //List of element in diagram 
  selectedNode: {}, // Current select node
  data: []   //List of table to join to 
};

import * as actions from '../actions/join';

export default function sqlDiagramReducer(state = initialState, action) {
  const actionHandlers = {
    [actions.SET_JOIN]() {
      // console.log("binhnt.injections.SqlSupport.reducers.sqlDiagram:  SET_JOIN ", state)
      return {
        ...state,
        join: action.join,
      };
    },
    [actions.SET_JOIN_ELEMENTS]() {
      // console.log("binhnt.injections.SqlSupport.reducers.sqlDiagram:  SET_JOIN_ELEMENTS ", state)
      return {
        ...state,
        joinElements: action.joinElements,
      };
    },
    [actions.ADD_JOIN_NODE]() {
      // console.log("binhnt.injections.SqlSupport.reducers.sqlDiagram:  ADD_JOIN_NODE ", state)
      return {
        ...state,
        joinElements: state.joinElements.concat(action.node),
      };
    },
    [actions.SET_SELECTED_NODE]() {
      // console.log("binhnt.injections.SqlSupport.reducers.sqlDiagram:  SET_SELECTED_COLUMN ", state)
      return {
        ...state,
        selectedNode: action.node,
      };
    },
    [actions.SET_SELECTED_COLUMN]() {
      // console.log("binhnt.injections.SqlSupport.reducers.sqlDiagram:  SET_SELECTED_COLUMN ", state)
      return {
        ...state,
        selectedColumn: action.column,
      };
    },
    [actions.SET_JOIN_DATA]() {
      // console.log("binhnt.injections.SqlSupport.reducers.sqlDiagram:  SET_JOIN_DATA ", state)
      return {
        ...state,
        joinElements: state.joinElements.map((el) =>
          el.id === action.id
            ? {
              ...el,
              data: {
                ...action.data,
              },
            }
            : el
        ),
      };
    },
    [actions.SET_COLUMNS]() {
      // console.log("binhnt.injections.SqlSupport.reducers.sqlDiagram:  SET_COLUMNS ", state)
      return {
        ...state,
        joinElements: state.joinElements.map((el) =>
          el.id === action.id
            ? {
              ...el,
              data: {
                ...el.data,
                columns: el.data.columns.map(
                  (col, i) =>
                  (i = action.index
                    ? {
                      ...col,
                    }
                    : col)
                ),
              },
            }
            : el
        ),
      };
    },
    [actions.SET_DISPLAY]() {
      // console.log("binhnt.injections.SqlSupport.reducers.sqlDiagram:  SET_DISPLAY ", state)
      return {
        ...state,
        display: !state.display,
      };
    }
  };

  if (action.type in actionHandlers) {
    return actionHandlers[action.type]();
  }
  return state;
}
