import localforage from "localforage";
import { ToDoSchema } from "./redux/todoAppActions";

const TODO_STORE = "TODO_STORE";

const addTodo = (payload: ToDoSchema[]) => {
  return localforage
    .setItem(TODO_STORE, payload)
    .then(value => {
      return { data: value };
    })
    .catch(err => {
      // This code runs if there were any errors
      return err;
    });
};

const getTodoList = () => {
  return localforage
    .getItem(TODO_STORE)
    .then(value => {
      return { data: value };
    })
    .catch(err => {
      // This code runs if there were any errors
      return err;
    });
};

export { addTodo, getTodoList };
