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
    <div key={todo.id}>
      {todo.isCompleted ? (
        <span className="strikeThrough"
        >
          {todo.value}
        </span>
      ) : isEditing ? (
        <input
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
        <span>{todo.value}</span>
      )}

      <span
        onClick={() => handleComplete(todo.id)}
      >
        ✔️
      </span>
      {!todo.isCompleted && !isEditing && (
        <span onClick={() => setEditing(true)}>📝</span>
      )}
      <span onClick={() => handleDelete(todo.id)}>❌</span>
    </div>
  );
});
