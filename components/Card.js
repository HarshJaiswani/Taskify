import React, { useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit, MdDone } from "react-icons/md";

const Card = ({ task, index, fetchData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const ref2 = useRef();
  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => ({ ...task, index }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult && item) {
        // console.log(item);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(ref2);

  const handleDelete = async () => {
    let data = await fetch("/api/tasks/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": JSON.parse(localStorage.getItem("auth-token")),
      },
      body: JSON.stringify({ taskId: task._id }),
    });
    let dataJson = await data.json();
    fetchData();
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsEditing(false);
    let data = await fetch("/api/tasks/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": JSON.parse(localStorage.getItem("auth-token")),
      },
      body: JSON.stringify({ taskId: task._id, text: editText }),
    });
    let dataJson = await data.json();
    fetchData();
  };

  return (
    <div
      ref={ref2}
      className={`flex justify-between items-center flex-wrap cursor-pointer rounded-[5px] p-5 mt-4 bg-[#808080]/[0.521] text-white transition-[0.2s]`}
    >
      {!isEditing && (
        <div className="pointer-events-none flex-1 p-[5px] border-none text-xl">
          {task.text}
        </div>
      )}
      {isEditing && (
        <form onSubmit={(e) => handleSave(e)}>
          <input
            type="text"
            className="outline-none text-black rounded-md py-1 px-2"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
        </form>
      )}
      <div className="flex items-center">
        {!isEditing ? (
          <MdEdit
            className="mr-2 cursor-pointer"
            onClick={() => setIsEditing(true)}
          />
        ) : (
          <MdDone
            className="mr-2 cursor-pointer"
            onClick={(e) => handleSave(e)}
          />
        )}
        <AiFillDelete className="mr-2 cursor-pointer" onClick={handleDelete} />
      </div>
    </div>
  );
};

export default Card;
