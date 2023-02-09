import React, { useState, useEffect } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext } from "react-beautiful-dnd";
import TodoList from "./components/TodoList";
import InputField from "./components/InputField";

let dataArray = [
  {
    name: "TODO",
    id: uuidv4(),
    tasks: [
      {
        id: uuidv4(),
        text: "Task 1",
      },
    ],
  },
  {
    name: "In-Progress",
    id: uuidv4(),
    tasks: [
      {
        id: uuidv4(),
        text: "Task 2",
      },
    ],
  },
  {
    name: "Completed",
    id: uuidv4(),
    tasks: [
      {
        id: uuidv4(),
        text: "Task 3",
      },
    ],
  },
];

function App() {
  const [data, setData] = useState(dataArray);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    if (localStorage.getItem("data")) {
      setData(JSON.parse(localStorage.getItem("data")));
    } else {
      localStorage.setItem("data", JSON.stringify(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  const addData = (e) => {
    e.preventDefault();
    if (todo == " ") {
      setTodo("");
    } else {
      data[0].tasks.push({ id: uuidv4(), text: todo });
      setData(data);
      localStorage.setItem("data", JSON.stringify(data));
      setTodo("");
    }
  };

  const handleDelete = (id, colId) => {
    let temp = data;
    let activeColumn = temp.find((col) => col.id === colId);
    let activeColumnIndex = data.findIndex((col) => col.id === colId);
    activeColumn.tasks = data[activeColumnIndex].tasks.filter(
      (task) => task.id !== id
    );
    data[activeColumnIndex] = activeColumn;
    setData(data.slice());
    localStorage.setItem("data", JSON.stringify(data));
    // window.location.reload();
  };

  const handleEdit = (e, id, editText, colId, setEdit) => {
    e.preventDefault();
    let activeColumn = data.find((col) => col.id === colId);
    let activeColumnIndex = data.findIndex((col) => col.id === colId);
    let activeTaskIndex = activeColumn.tasks.findIndex(
      (task) => task.id === id
    );
    data[activeColumnIndex].tasks[activeTaskIndex].text = editText;
    setData(data.slice());
    localStorage.setItem("data", JSON.stringify(data));
    setEdit(false);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
    const destinationColIndex = data.findIndex(
      (e) => e.id === destination.droppableId
    );

    const sourceCol = data[sourceColIndex];
    const destinationCol = data[destinationColIndex];

    const sourceTasks = [...sourceCol.tasks];
    const destinationTasks = [...destinationCol.tasks];

    if (
      destination.droppableId === source.droppableId &&
      source.index !== destination.index
    ) {
      const [removed] = destinationTasks.splice(source.index, 1);
      // todos.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, removed);
    } else {
      const [removed] = sourceTasks.splice(source.index, 1);
      // todos.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, removed);
    }

    data[sourceColIndex].tasks = sourceTasks;
    data[destinationColIndex].tasks = destinationTasks;

    setData(data);
    localStorage.setItem("data", JSON.stringify(data));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="taskify">
        <h1 className="heading">Taskify</h1>
        <InputField addData={addData} todo={todo} setTodo={setTodo} />
        <TodoList
          data={data}
          setData={setData}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </div>
    </DragDropContext>
  );
}

export default App;

// {/* <a target="_blank" href="https://icons8.com/icon/LFB02ASKjxl3/task">Task</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a> */}
