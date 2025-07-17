import { useState, memo } from "react";

export default memo(function Item({
  todo,
  handleComplete,
  handleDelete,
  handleUpdate,
}) {
  const [isEditing, setEditing] = useState(false);
  const [udpatedValue, setUpdatedValue] = useState(todo.value);
  console.log("list Item rendering");
  return (
    <div style={{ margin: "0.5rem" }} key={todo.id}>
      {todo.isCompleted ? (
        <span
          style={{
            marginRight: "2rem",
            textDecoration: "line-through",
          }}
        >
          {todo.value}
        </span>
      ) : isEditing ? (
        <input
          value={udpatedValue}
          type="text"
          onChange={(e) => setUpdatedValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleUpdate(todo.id, udpatedValue);
              setEditing(false);
            }
          }}
        />
      ) : (
        <span style={{ marginRight: "2rem" }}>{todo.value}</span>
      )}

      <span
        onClick={() => handleComplete(todo.id)}
        style={{ marginRight: "0.5rem" }}
      >
        ✔️
      </span>
      {!todo.isCompleted && !isEditing && (
        <span onClick={() => setEditing(true)}>📝</span>
      )}
      <span onClick={() => handleDelete(todo.id)}>╳</span>
    </div>
  );
});
