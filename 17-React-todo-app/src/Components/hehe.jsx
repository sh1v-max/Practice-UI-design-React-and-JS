import { useEffect, useState, useCallback } from "react";
import ListItem from "./Item";

export default function Todo() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  //[{value:"learn react",isCompleted:false,id:time},{},{}]
  // console.log(todos);
  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const addTodo = () => {
    const newTodos = todos.map((todo) => {
      return { ...todo };
    });
    newTodos.push({
      value: task,
      isCompleted: false,
      id: new Date().getTime(),
    });
    setTodos(newTodos);
    setTask("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const handleDelete = useCallback((id) => {
    setTodos((prevTodos) => {
      const filteredTodo = prevTodos.filter((todo) => {
        return todo.id !== id;
      });
      return filteredTodo;
    });
  }, []);

  const handleComplete = useCallback((id) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isCompleted: !todo.isCompleted };
        } else {
          return todo;
        }
      });
    });
  }, []);

  const handleUpdate = useCallback((id, updatedValue) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, value: updatedValue };
        } else {
          return todo;
        }
      });
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  console.log("Rendering Todo comp");
  return (
    <div>
      <div>
        <input
          value={task}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          type="text"
        />
        <button onClick={addTodo}>Add Task</button>
      </div>
      <div>
        {todos.map((todo) => {
          return (
            <ListItem
              key={todo.id}
              todo={todo}
              handleComplete={handleComplete}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          );
        })}
      </div>
    </div>
  );
}
