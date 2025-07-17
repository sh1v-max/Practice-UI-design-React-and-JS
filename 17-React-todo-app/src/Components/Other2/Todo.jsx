import React, { useCallback, useEffect, useState } from 'react'
import ListItem from './ListItem'

const Todo = () => {
  const [task, setTask] = useState('')
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('todos')) || []
  )

  console.log(todos)
  const handleChange = (e) => {
    setTask(e.target.value)
  }

  const addTodo = () => {
    const newTodos = todos.map((todo) => {
      return { ...todo }
    })
    newTodos.push({
      value: task,
      isCompleted: false,
      id: new Date().getTime(),
    })
    setTodos(newTodos)
    setTask('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  // const handleDelete = (id) => {
  //   const filteredTodo = todos.filter((todo) => {
  //     return todo.id !== id
  //   })
  //   setTodos(filteredTodo)
  // }

  // functional update which ensure it always works on the latest state
  // useCallback to memoize the function
  const handleDelete = useCallback((id) => {
    setTodos((prevTodos) => {
      const filteredTodo = prevTodos.filter((todo) => {
        return todo.id !== id;
      });
      return filteredTodo;
    });
  }, []);

  // const handleComplete = (id) => {
  //   const newTodos = todos.map((todo) => {
  //     return { ...todo }
  //   })
  //   newTodos.forEach((todo) => {
  //     if (todo.id === id) {
  //       todo.isCompleted = !todo.isCompleted
  //     }
  //   })
  //   setTodos(newTodos)
  // }

  // using useCallback to memoize and functional setTodos(prev => ...) 
  // to avoid unnecessary re-renders
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

  // todo update logic
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
    // todo is array but local storage can only store string so we need to convert it to string
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <div className="todo-container">
      <div className="input-section">
        <input
          className="todo-input"
          value={task}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Add a new todo..."
        />
        <button className="add-btn" onClick={addTodo}>Add Todo</button>
      </div>
      <div className="todo-list">
        {todos.map((todo) => {
          return (
            // we can create separate component
            // <div style={{ margin: '0.5rem' }} key={todo.id}>
            //   {todo.isCompleted ? (
            //     <span
            //       style={{
            //         marginRight: '2rem',
            //         textDecoration: 'line-through',
            //       }}
            //     >
            //       {todo.value}
            //     </span>
            //   ) : (
            //     <span style={{ marginRight: '2rem' }}>{todo.value}</span>
            //   )}
            //   <span
            //     onClick={() => handleComplete(todo.id)}
            //     style={{ marginRight: '0.5rem' }}
            //   >
            //     ✔️
            //   </span>
            //   <span onClick={() => handleDelete(todo.id)}>❌</span>
            // </div>
            <ListItem
              key={todo.id}
              todo={todo}
              handleComplete={handleComplete}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Todo
