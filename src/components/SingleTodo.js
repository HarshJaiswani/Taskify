import React, { useEffect, useState } from "react";
import "./SingleTodo.css";
import { Draggable } from "react-beautiful-dnd";
import { MdDelete, MdEdit } from "react-icons/md";

const SingleTodo = ({ handleDelete, handleEdit, task, index, colId}) => {
  const [edit, setEdit] = useState(false);
  const [editTaskText, setEditTaskText] = useState(task.text);
  useEffect(() => {
    setEditTaskText(task.text);
  },[task])
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <form
          className="todos__single"
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          onSubmit={(e) => handleEdit(e, task.id,editTaskText,colId,setEdit)}
        >
          {edit ? (
            <input
              className="edit__input"
              type="text"
              value={editTaskText}
              onChange={(e) => setEditTaskText(e.target.value)}
            />
          ) : (
            <span className="todos__single--text">{task.text}</span>
          )}
          <div className="icon">
            {!edit && (
              <span onClick={() => setEdit(true)}>
                <MdEdit />
              </span>
            )}
            <span onClick={(e) => handleDelete(task.id,colId)}>
              <MdDelete />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
