import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Stats = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tasks"));
    if (stored) setTasks(stored);
  }, []);

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div style={{
      padding: "20px",
      color: "white",
      background: "#0f0f1a",
      minHeight: "100vh"
    }}>
      <h1>Stats</h1>

      <p>Total Tasks: {total}</p>
      <p>Completed: {completed}</p>
      <p>Progress: {percent}%</p>

      <Link to="/" style={{ color: "#a78bfa" }}>← Back</Link>
    </div>
  );
};

export default Stats;