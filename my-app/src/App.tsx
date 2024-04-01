import React, { useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

function App() {
  // let [tasks, setTasks] = useState([
  //     {id: v1(), title: "HTML&CSS", isDone: true},
  //     {id: v1(), title: "JS", isDone: true},
  //     {id: v1(), title: "ReactJS", isDone: false},
  //     {id: v1(), title: "Rest API", isDone: false},
  //     {id: v1(), title: "GraphQL", isDone: false},
  // ]);
  // let [filter, setFilter] = useState<FilterValuesType>("all");

  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, setTodolists] = useState<Array<TodoListType>>([
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ]);

  let [tasks, setTasks] = useState({
    [todolistID1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "Rest API", isDone: false },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: "HTML&CSS2", isDone: true },
      { id: v1(), title: "JS2", isDone: true },
      { id: v1(), title: "ReactJS2", isDone: false },
      { id: v1(), title: "Rest API2", isDone: false },
      { id: v1(), title: "GraphQL2", isDone: false },
    ],
  });

  function removeTask(todolistID: string, taskId: string) {
    let filteredTasks = tasks[todolistID].filter((t) => t.id !== taskId);
    setTasks({ ...tasks, [todolistID]: filteredTasks });
  }

  function addTask(todolistID: string, title: string) {
    let task = { id: v1(), title: title, isDone: false };
    // let newTasks = [task, ...tasks];
    setTasks({ ...tasks, [todolistID]: [...tasks[todolistID], task] });
  }

  function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
    // let task = tasks.find((t) => t.id === taskId);
    // if (task) {
    //   task.isDone = isDone;
    // }
    // setTasks([...tasks]);
    setTasks({
      ...tasks,
      [todolistID]: [
        ...tasks[todolistID].map((el) =>
          el.id === taskId ? { ...el, isDone: isDone } : el
        ),
      ],
    });
  }

  //   let tasksForTodolist = tasks;

  //   if (filter === "active") {
  //     tasksForTodolist = tasks.filter((t) => t.isDone === false);
  //   }
  //   if (filter === "completed") {
  //     tasksForTodolist = tasks.filter((t) => t.isDone === true);
  //   }

  function changeFilter(todolistID: string, value: FilterValuesType) {
    setTodolists(
      todolists.map((el) =>
        el.id === todolistID ? { ...el, filter: value } : el
      )
    );
  }

  return (
    <div className="App">
      {todolists.map((el) => {
        let tasksForTodoList = tasks[el.id];
        if (el.filter === "active") {
          tasksForTodoList = tasks[el.id].filter((el) => !el.isDone);
        }
        if (el.filter === "completed") {
          tasksForTodoList = tasks[el.id].filter((el) => !el.isDone);
        }
        return (
          <Todolist
            title={el.title}
            todolistID={el.id}
            tasks={tasksForTodoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={el.filter}
          />
        );
      })}
    </div>
  );
}

export default App;
