import React, { useState, useEffect, useRef } from "react";
import { BsFileText } from "react-icons/bs";
import { IoPencilOutline } from "react-icons/io5";
import { MdOutlineDone } from "react-icons/md";
import { useDrop } from "react-dnd";
import Card from "../components/Card";

const Column = ({ col, tasks, moveItem, fetchData }) => {
  const ref = useRef(null);
  const [{ isOver }, dropref] = useDrop({
    accept: "card",
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
    drop(item) {
      moveItem(item, col);
      if (item.status == col.toLowerCase()) {
        // console.log("change in priority!");
      }
    },
  });
  dropref(ref);
  return (
    <div
      ref={ref}
      className="p-5 mx-2.5 my-4 mt-5 flex flex-1 flex-col rounded-[5px] bg-[#1b3b4b]"
    >
      <h2 className="text-3xl text-white flex items-center">
        {col == "Done" && <MdOutlineDone className="mx-4 text-green-400" />}
        {col == "In-Progress" && (
          <IoPencilOutline className="mx-4 text-[yellow]" />
        )}
        {col == "Todo" && <BsFileText className="mx-4" />}
        {col}
      </h2>
      {tasks.map(
        (task, index) =>
          task.status == col.toLowerCase() && (
            <Card task={task} key={index} index={index} fetchData={fetchData} />
          )
      )}
    </div>
  );
};

export default Column;
