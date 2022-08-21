import React, { useRef } from "react";
import "./InputField.css";

const InputField = ({addData,todo,setTodo}) => {
  const inputRef = useRef();
  return (
    <div className="input__fields">
      <form
        className="input"
        onSubmit={(e) => {
          addData(e);
          inputRef.current.blur();
        }}
      >
        <input
          ref={inputRef}
          type="input"
          placeholder="Enter a task"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className="input__box"
        />
        <button className="input__submit" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default InputField;
