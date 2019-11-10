import { combineReducers } from "redux";

import {
  ActionSchema,
  TodoResponseSchema,
  toDoAppConst
} from "./todoAppActions";

const addTodoReducer = (
  state = {},
  action: ActionSchema<TodoResponseSchema>
) => {
  switch (action.type) {
    case toDoAppConst.Add_TODO_ERROR:
    case toDoAppConst.Add_TODO_LOADING:
    case toDoAppConst.Add_TODO_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

const removeTodoReducer = (
  state = {},
  action: ActionSchema<TodoResponseSchema>
) => {
  switch (action.type) {
    case toDoAppConst.REMOVE_TODO_ERROR:
    case toDoAppConst.REMOVE_TODO_LOADING:
    case toDoAppConst.REMOVE_TODO_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

const getTodoListReducer = (
  state = {},
  action: ActionSchema<TodoResponseSchema>
) => {
  switch (action.type) {
    case toDoAppConst.GET_TODO_LIST_ERROR:
    case toDoAppConst.GET_TODO_LIST_LOADING:
    case toDoAppConst.GET_TODO_LIST_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

const todoAppReducer = combineReducers({
  addTodo: addTodoReducer,
  removeTodo: removeTodoReducer,
  getTodoList: getTodoListReducer
});

export interface TodoAppSchema {
  addTodo: TodoResponseSchema;
  removeTodo: TodoResponseSchema;
  getTodoList: TodoResponseSchema;
}

export default todoAppReducer;
