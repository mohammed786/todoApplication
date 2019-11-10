// Constants
export const toDoAppConst = {
  Add_TODO: "ADD_TODO",
  Add_TODO_LOADING: "ADD_TODO_LOADING",
  Add_TODO_ERROR: "ADD_TODO_ERROR",
  Add_TODO_SUCCESS: "ADD_TODO_SUCCESS",

  REMOVE_TODO: "REMOVE_TODO",
  REMOVE_TODO_LOADING: "REMOVE_TODO_LOADING",
  REMOVE_TODO_ERROR: "REMOVE_TODO_ERROR",
  REMOVE_TODO_SUCCESS: "REMOVE_TODO_SUCCESS",

  GET_TODO_LIST: "GET_TODO_LIST",
  GET_TODO_LIST_LOADING: "GET_TODO_LIST_LOADING",
  GET_TODO_LIST_ERROR: "GET_TODO_LIST_ERROR",
  GET_TODO_LIST_SUCCESS: "GET_TODO_LIST_SUCCESS"
};

export const successSideEffectState: SideEffectSchema = {
  isLoading: false,
  isSuccess: true,
  isError: false,
  error: ""
};

// Action Creators
export const loadingAction = (type: string) => {
  return {
    type,
    payload: {
      isLoading: true,
      isSuccess: false,
      isError: false,
      error: ""
    }
  };
};

export const errorAction = (type: string, error: string) => {
  return {
    type,
    payload: {
      isLoading: false,
      isSuccess: false,
      isError: true,
      error
    }
  };
};

export interface ToDoSchema {
  id: string;
  desription: string;
  isCompleted: boolean;
  bucketId: string;
}

interface SideEffectSchema {
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  error?: string;
}

export interface ActionSchema<T> {
  type: string;
  payload: T;
}

/**
 * ADD_TOTO
 */
export interface TodoResponseSchema extends SideEffectSchema {
  data: ToDoSchema[];
}
export const addTodoAction = (payload: ToDoSchema) => {
  return {
    type: toDoAppConst.Add_TODO,
    payload
  };
};
export const addTodoLoadingAction = () => {
  return loadingAction(toDoAppConst.Add_TODO_LOADING);
};
export const addTodoErrorAction = (error: string) => {
  return errorAction(toDoAppConst.Add_TODO_ERROR, error);
};
export const addTodoSuccessAction = (data: TodoResponseSchema) => {
  const payload: TodoResponseSchema = {
    ...data,
    ...successSideEffectState
  };
  return {
    type: toDoAppConst.Add_TODO_SUCCESS,
    payload
  };
};

/**
 * REMOVE_TOTO
 */
export const removeTodoAction = (payload: ToDoSchema) => {
  return {
    type: toDoAppConst.REMOVE_TODO,
    payload
  };
};
export const removeTodoLoadingAction = () => {
  return loadingAction(toDoAppConst.REMOVE_TODO_LOADING);
};
export const removeTodoErrorAction = (error: string) => {
  return errorAction(toDoAppConst.REMOVE_TODO_ERROR, error);
};
export const removeTodoSuccessAction = (data: TodoResponseSchema) => {
  const payload: TodoResponseSchema = {
    ...data,
    ...successSideEffectState
  };
  return {
    type: toDoAppConst.REMOVE_TODO_SUCCESS,
    payload
  };
};

/**
 * GET_TODO_LIST
 */
export const getTodoListAction = () => {
  return {
    type: toDoAppConst.GET_TODO_LIST
  };
};
export const getTodoListLoadingAction = () => {
  return loadingAction(toDoAppConst.GET_TODO_LIST_LOADING);
};
export const getTodoListErrorAction = (error: string) => {
  return errorAction(toDoAppConst.GET_TODO_LIST_ERROR, error);
};
export const getTodoListSuccessAction = (data: TodoResponseSchema) => {
  const payload: TodoResponseSchema = {
    ...data,
    ...successSideEffectState
  };
  return {
    type: toDoAppConst.GET_TODO_LIST_SUCCESS,
    payload
  };
};
