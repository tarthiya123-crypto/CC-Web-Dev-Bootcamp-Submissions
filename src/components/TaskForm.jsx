import React, { useState } from "react";

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Study");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title,
      priority,
      category,
      completed: false,
    };

    onAdd(newTask);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
        style={{
            padding: "10px",
            marginRight: "10px",
            borderRadius: "6px",
            border: "none",
            outline: "none"
        }}
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}
        style={{marginRight: "10px", padding: "8px", borderRadius: "6px"}}>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <select value={category} onChange={(e) => setCategory(e.target.value)} style={{padding: "8px", borderRadius: "6px"}}>
        <option>Study</option>
        <option>Work</option>
        <option>Personal</option>
      </select>

      <button 
      type="submit"
      style={{
        backgroundColor: "#5e3097",
        color: "white",
        padding: "10px 14px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold"
      }}>Add</button>
    </form>
  );
};

export default TaskForm;