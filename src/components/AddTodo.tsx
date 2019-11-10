import React from "react";

export interface AddTodoProps {
  onSubmit: () => void;
  value?: string;
  onInputChange?: (e: any) => void;
}

const AddTodo: React.FC<AddTodoProps> = props => {
  return (
    <div className="md-form d-flex">
      <input
        type="text"
        id="form1"
        className="form-control"
        onChange={props.onInputChange}
        value={props.value}
      />
      <label htmlFor="form1">Todo Description</label>
      <button
        type="submit"
        className="btn btn-primary"
        onClick={props.onSubmit}
      >
        Add
      </button>
    </div>
  );
};

export default AddTodo;
