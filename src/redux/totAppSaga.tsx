import { take, call, put, all } from "redux-saga/effects";
import {
  toDoAppConst,
  TodoResponseSchema,
  addTodoLoadingAction,
  ToDoSchema,
  addTodoSuccessAction,
  addTodoErrorAction,
  getTodoListLoadingAction,
  getTodoListSuccessAction,
  getTodoListErrorAction,
  removeTodoLoadingAction,
  removeTodoSuccessAction,
  removeTodoErrorAction
} from "./todoAppActions";

import { getTodoList, addTodo } from "../helperMethods";

function* addTodoHandler(type: string, payload?: ToDoSchema) {
  let todoList: ToDoSchema[] = [];
  switch (type) {
    case "add":
      try {
        yield put(addTodoLoadingAction());
        let todoListResp: TodoResponseSchema = yield getTodoList();
        todoList = todoListResp.data ? [...todoListResp.data] : [];
        if (payload) {
          if (todoList && todoList.length) {
            todoList.unshift(payload);
          } else {
            todoList = [payload];
          }
        }
        const response: TodoResponseSchema = yield addTodo(todoList);

        if (response.data) {
          yield put(addTodoSuccessAction({ ...response }));
        } else {
          yield put(addTodoErrorAction("Failed to add a Todo in a list"));
        }
      } catch (e) {
        yield put(addTodoErrorAction(e.message));
      }
      break;
    case "remove":
      try {
        yield put(removeTodoLoadingAction());

        const response: TodoResponseSchema = yield getTodoList();
        todoList = [...response.data];
        let index =
          payload && response.data.findIndex(todo => todo.id === payload.id);

        if (index !== undefined && index >= 0 && payload) {
          todoList[index].isCompleted = payload.isCompleted;
        } else {
          throw new Error("Nothing to delete");
        }

        const removeResponse: TodoResponseSchema = yield addTodo(todoList);

        if (removeResponse.data) {
          todoList = removeResponse.data;
          yield put(removeTodoSuccessAction({ ...removeResponse }));
        } else {
          yield put(removeTodoErrorAction("Failed to remove a Todo in a list"));
        }
      } catch (e) {
        yield put(removeTodoErrorAction(e.message));
      }
      break;
    case "get":
      try {
        yield put(getTodoListLoadingAction());

        const response: TodoResponseSchema = yield getTodoList();

        if (response.data) {
          todoList = response.data;
          yield put(getTodoListSuccessAction({ ...response }));
        } else {
          yield put(getTodoListErrorAction("Failed to load list"));
        }
      } catch (e) {
        yield put(getTodoListErrorAction(e.message));
      }
      break;
  }
}

function* watchAddTodo() {
  while (true) {
    const { payload } = yield take(toDoAppConst.Add_TODO);
    yield call(addTodoHandler, "add", payload);
  }
}

function* watchgetTodoList() {
  while (true) {
    const { payload } = yield take(toDoAppConst.GET_TODO_LIST);
    yield call(addTodoHandler, "get", payload);
  }
}

function* watchremoveTodo() {
  while (true) {
    const { payload } = yield take(toDoAppConst.REMOVE_TODO);
    yield call(addTodoHandler, "remove", payload);
  }
}

function* rootSaga() {
  yield all([watchAddTodo(), watchgetTodoList(), watchremoveTodo()]);
}

export default rootSaga;
