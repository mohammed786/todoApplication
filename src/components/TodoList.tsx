import React from "react";
import { ToDoSchema } from "../redux/todoAppActions";

export interface TodoListProps {
  todoList: ToDoSchema[];
  onChecked: (e: any, todo: ToDoSchema) => void;
}

const TodoList: React.SFC<TodoListProps> = props => {
  let activeList: ToDoSchema[] = props.todoList.filter(
    todo => !todo.isCompleted
  );
  let checkedList: ToDoSchema[] = props.todoList.filter(
    todo => todo.isCompleted
  );
  return (
    <table className="table table-hover table-borderless">
      <thead>
        <tr>
          <th className="th-lg" scope="col">
            Desecription
          </th>
          <th className="th-sm" scope="col">
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        {activeList.map((todo, index) => {
          return (
            <tr key={index}>
              <td>{todo.desription}</td>
              <td>
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="defaultUnchecked"
                  onChange={e => props.onChecked(e, todo)}
                ></input>
              </td>
            </tr>
          );
        })}
      </tbody>
      {checkedList.length > 0 && (
        <React.Fragment>
          <thead>
            <tr>
              <th className="th-lg" scope="col">
                Desecription
              </th>
              <th className="th-sm" scope="col">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {checkedList.map((todo, index) => {
              return (
                <tr key={index}>
                  <td>
                    <del>{todo.desription}</del>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked
                      className="custom-control-input"
                      id="defaultUnchecked"
                      onChange={e => props.onChecked(e, todo)}
                    ></input>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </React.Fragment>
      )}
    </table>
  );
};

export default TodoList;
