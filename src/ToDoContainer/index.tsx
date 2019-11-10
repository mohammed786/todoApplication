import React from "react";
import Header from "../components/Header";
import AddTodo from "../components/AddTodo";

import "./ToDoContainer.scss";
import {
  ToDoSchema,
  TodoResponseSchema,
  getTodoListAction,
  addTodoAction,
  removeTodoAction
} from "../redux/todoAppActions";
import { TodoAppSchema } from "../redux/todaAppReducer";
import { connect } from "react-redux";
import TodoList from "../components/TodoList";

export interface ToDoContainerProps {
  getTodos: () => void;
  getTodosResponse: TodoResponseSchema;
  addTodo: (todo: ToDoSchema) => void;
  addTodoResp: TodoResponseSchema;
  removeTodo: (todo: ToDoSchema) => void;
  removeTodoResp: TodoResponseSchema;
}

export interface ToDoContainerState {
  toDoList: ToDoSchema[];
  todoPayload: ToDoSchema;
}

class ToDoContainer extends React.Component<
  ToDoContainerProps,
  ToDoContainerState
> {
  constructor(props: ToDoContainerProps) {
    super(props);
    this.state = {
      toDoList: [],
      todoPayload: {
        id: "",
        isCompleted: false,
        desription: "",
        bucketId: "1"
      }
    };
  }

  componentDidUpdate(prevProps: ToDoContainerProps) {
    const { addTodoResp, getTodos, removeTodoResp } = this.props;
    if (prevProps.addTodoResp.isLoading && !addTodoResp.isLoading) {
      if (addTodoResp.isSuccess) {
        getTodos();
      }
    }
    if (prevProps.removeTodoResp.isLoading && !removeTodoResp.isLoading) {
      if (removeTodoResp.isSuccess) {
        getTodos();
      }
    }
  }

  componentDidMount() {
    this.props.getTodos();
  }
  render() {
    const { getTodosResponse } = this.props;
    let todoList = getTodosResponse.isSuccess ? getTodosResponse.data : [];
    return (
      <div>
        <Header />
        <div className="container d-flex">
          <div className="container-content w-100">
            <AddTodo
              onInputChange={e => {
                this.setState({
                  todoPayload: {
                    ...this.state.todoPayload,
                    id: new Date().getTime().toString(),
                    desription: e.target.value
                  }
                });
              }}
              onSubmit={() => {
                this._addTodo();
              }}
            />
            <TodoList todoList={todoList} onChecked={this._toggleTodo} />
          </div>
        </div>
      </div>
    );
  }

  _toggleTodo = (e: any, todo: ToDoSchema) => {
    todo.isCompleted = e.target.checked;
    this.props.removeTodo(todo);
  };

  _addTodo() {
    if (this.state.todoPayload.desription.trim()) {
      this.props.addTodo(this.state.todoPayload);
    }
  }
}

const mapSateToProps = (state: TodoAppSchema) => {
  return {
    getTodosResponse: state.getTodoList,
    addTodoResp: state.addTodo,
    removeTodoResp: state.removeTodo
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getTodos: () => dispatch(getTodoListAction()),
    addTodo: (todo: ToDoSchema) => dispatch(addTodoAction(todo)),
    removeTodo: (todo: ToDoSchema) => dispatch(removeTodoAction(todo))
  };
};

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(ToDoContainer);
