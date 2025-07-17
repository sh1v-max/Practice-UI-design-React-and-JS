import { useState, memo } from "react";

// using memo to prevent unnecessary renders, only when prop changes
export default memo(function Item({
  todo,
  handleComplete,
  handleDelete,
  handleUpdate,
}) {
  const [isEditing, setEditing] = useState(false);
  const [updatedValue, setUpdatedValue] = useState(todo.value);
  // console.log("list Item rendering");
  return (
    <div className="todo-item" key={todo.id}>
      <div className="todo-content">
        {todo.isCompleted ? (
          <span className="todo-text strikeThrough">
            {todo.value}
          </span>
        ) : isEditing ? (
          <input
            className="edit-input"
            value={updatedValue}
            type="text"
            onChange={(e) => setUpdatedValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (updatedValue.trim()) {
                  handleUpdate(todo.id, updatedValue.trim());
                  setEditing(false);
                }
              }
              if (e.key === "Escape") {
                setUpdatedValue(todo.value);
                setEditing(false);
              }
            }}
            autoFocus
          />
        ) : (
          <span className="todo-text">{todo.value}</span>
        )}
        
        {todo.createdAt && (
          <span className="todo-timestamp">
            📅 {todo.createdAt}
          </span>
        )}
      </div>

      <div className="todo-actions">
        <span
          className="action-btn complete-btn"
          onClick={() => handleComplete(todo.id)}
          title={todo.isCompleted ? "Mark as incomplete" : "Mark as complete"}
        >
          {todo.isCompleted ? "↩️" : "✅"}
        </span>
        
        {!todo.isCompleted && !isEditing && (
          <span 
            className="action-btn edit-btn" 
            onClick={() => setEditing(true)}
            title="Edit todo"
          >
            📝
          </span>
        )}
        
        {isEditing && (
          <span 
            className="action-btn cancel-btn" 
            onClick={() => {
              setUpdatedValue(todo.value);
              setEditing(false);
            }}
            title="Cancel editing"
          >
            ❌
          </span>
        )}
        
        <span 
          className="action-btn delete-btn" 
          onClick={() => handleDelete(todo.id)}
          title="Delete todo"
        >
          🗑️
        </span>
      </div>
    </div>
  );
});