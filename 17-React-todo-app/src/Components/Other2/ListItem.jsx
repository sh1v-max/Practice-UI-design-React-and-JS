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
              handleUpdate(todo.id, updatedValue);
              setEditing(false);
            }
          }}
        />
      ) : (
        <span className="todo-text">{todo.value}</span>
      )}

      <span
        className="action-btn complete-btn"
        onClick={() => handleComplete(todo.id)}
      >
        ✔️
      </span>
      {!todo.isCompleted && !isEditing && (
        <span className="action-btn edit-btn" onClick={() => setEditing(true)}>📝</span>
      )}
      <span className="action-btn delete-btn" onClick={() => handleDelete(todo.id)}>❌</span>
    </div>
  );
});
