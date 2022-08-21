import React from "react";
import "./TodoList.css";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

const TodoList = ({ data,handleDelete,handleEdit }) => {
    return (
    <div className="container">
      {data.map((column, index) => (
        <Droppable droppableId={column.id} key={index}>
          {(provided) => (
            <div
              className="todos"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="todos__heading">{column.name}</span>
              {column.tasks.map((task, index) => (
                <SingleTodo handleDelete={handleDelete} handleEdit={handleEdit} task={task} key={index} index={index} colId={column.id} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ))}
    </div>
  );
};

export default TodoList;
