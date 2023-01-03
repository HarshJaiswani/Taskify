import React from "react";
import "./TodoList.css";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";
import { BsFileText } from "react-icons/bs";
import { IoPencilOutline } from "react-icons/io5";
import { MdOutlineDone } from "react-icons/md";

const TodoList = ({ data, handleDelete, handleEdit }) => {
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
              <span className="todos__heading">
                {column.name === "TODO" && (
                  <span className="flex items-center">
                    <BsFileText className="mx-4" />
                    {column.name}
                  </span>
                )}
                {column.name === "In-Progress" && (
                  <span className="flex items-center">
                    <IoPencilOutline className="mx-4 text-[yellow]" />
                    {column.name}
                  </span>
                )}
                {column.name === "Completed" && (
                  <span className="flex items-center">
                    <MdOutlineDone className="mx-4 text-green-400" />
                    {column.name}
                  </span>
                )}
                {column.name !== "TODO" &&
                  column.name !== "In-Progress" &&
                  column.name !== "Completed" &&
                  column.name}
              </span>
              {column.tasks.map((task, index) => (
                <SingleTodo
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                  task={task}
                  key={index}
                  index={index}
                  colId={column.id}
                />
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
