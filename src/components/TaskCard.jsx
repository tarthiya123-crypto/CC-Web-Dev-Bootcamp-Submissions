import React from "react";

const TaskCard = ({ task, onToggle, onDelete }) => {
  return (
    <div style={{
      border: "1px solid #7c3aed",
      padding: "12px",
      marginBottom: "10px",
      borderRadius: "10px",
      background: "rgba(30,27,75,0.8)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <span style={{
        textDecoration: task.completed ? "line-through" : "none"
      }}>
        {task.title} ({task.priority})
      </span>

      <button onClick={() => onToggle(task.id)}>Done</button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
};

export default TaskCard;