import React, { useEffect, useState } from "react";
import Column from "../components/Column";
const cols = ["Todo", "In-Progress", "Done"];

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let data = await fetch("/api/tasks/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": JSON.parse(localStorage.getItem("auth-token")),
      },
    });
    let dataJson = await data.json();
    // console.log(dataJson);
    setTasks(dataJson);
  };
  const moveItem = (item, status) => {
    let task = tasks.findIndex((a) => a._id == item._id);
    setTasks([...tasks, (tasks[task].status = status.toLowerCase())]);
    fetch("/api/tasks/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": JSON.parse(localStorage.getItem("auth-token")),
      },
      body: JSON.stringify({ status: status.toLowerCase(), taskId: item._id }),
    })
      .then((data) => data.json())
      .then((data) => {});
  };

  const handleSendTask = async (e) => {
    e.preventDefault();
    let data = await fetch("/api/tasks/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": JSON.parse(localStorage.getItem("auth-token")),
      },
      body: JSON.stringify({ text: taskText }),
    });
    let dataJson = await data.json();
    setTaskText("");
    fetchData();
  };

  return (
    <div className="w-full min-h-[90vh] bg-gray-100">
      <form
        onSubmit={(e) => handleSendTask(e)}
        className="w-full cursor-pointer flex border-b"
      >
        <input
          type="text"
          placeholder="Specify task"
          spellCheck={false}
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          className="w-full outline-none px-2 py-2.5"
        />
        <button
          type="submit"
          className="px-8 py-2 border-l bg-white hover:bg-gray-100"
        >
          Add
        </button>
      </form>
      <div className="flex flex-wrap w-full mx-auto justify-evenly">
        {cols.map((col, index) => (
          <Column
            key={index}
            col={col}
            tasks={tasks}
            moveItem={moveItem}
            fetchData={fetchData}
          />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
