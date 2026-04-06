import React, { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import FilterBar from "../components/FilterBar";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("None");
  const [search, setSearch] = useState("");
  const [randomTask, setRandomTask] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tasks"));
    if (stored) setTasks(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks((prev) => [task, ...prev]);
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const pickRandomTask = () => {
  if (tasks.length === 0) return;

  const random = tasks[Math.floor(Math.random() * tasks.length)];
  setRandomTask(random);

  window.scrollTo({ top: 0, behavior: "smooth" });
};

  const filteredTasks = tasks
    .filter((t) => {
      if (filter === "Completed") return t.completed;
      if (filter === "Pending") return !t.completed;
      return true;
    })
    .filter((t) =>
      t.title?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "High") {
        const order = { High: 1, Medium: 2, Low: 3 };
        return order[a.priority] - order[b.priority];
      }
      if (sort === "Low") {
        const order = { Low: 1, Medium: 2, High: 3 };
        return order[a.priority] - order[b.priority];
      }
      return 0;
    });

  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      background: "linear-gradient(135deg, #4c1d95, #7c3aed, #a78bfa)",
      display: "flex",
      justifyContent: "center"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "600px",
        padding: "30px",
        color: "white"
      }}>
        <h1 style={{ marginBottom: "10px" }}>
          Productivity Tracker
        </h1>

        <Link to="/stats" style={{ color: "#ddd6fe", display: "inline-block", marginBottom:"10px"}}>
          Go to Stats →
        </Link>

        <div style={{ marginTop: "15px" }}>
          <TaskForm onAdd={addTask} />
        </div>

        <div style={{ marginTop: "15px" }}>
          <FilterBar
            filter={filter}
            setFilter={setFilter}
            sort={sort}
            setSort={setSort}
            search={search}
            setSearch={setSearch}
          />
        </div>

        <button
          onClick={pickRandomTask}
          style={{
            background: "#6d28d9",
            color: "white",
            padding: "10px 14px",
            border: "none",
            borderRadius: "8px",
            marginTop: "15px",
            marginBottom: "15px",
            cursor: "pointer"
          }}
        >
          Pick Random Task 🎲
        </button>

        {randomTask && (
          <div style={{
            background: "#5b21b6",
            padding: "14px",
            borderRadius: "10px",
            marginBottom: "15px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
          }}>
            Focus: {randomTask.title}
          </div>
        )}

        {filteredTasks.length === 0 ? (
          <p style={{opacity: 0.8}}>
            No tasks found</p>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;