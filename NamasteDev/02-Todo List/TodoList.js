import React, { useState } from 'react'

function TodoList() {
  const [input, setInput] = useState()

  const [todoList, setTodoList] = useState([])

  const addTodoItem = () => {
    if (input.trim() === '') return

    const item = {
      id: todoList.length + 1,
      text: input.trim(),
      completed: false,
    }

    setTodoList((prev) => [...prev, item])
    setInput('')
  }

  const toggleCompleted = (id) => {
    setTodoList(
      todoList.map((t) => {
        if (t.id === id) {
          return {
            ...t,
            completed: !t.completed,
          }
        } else {
          return t
        }
      })
    )
  }

  const deleteTodo = (id) => {
    setTodoList(todoList.filter((t) => t.id !== id))
  }

  return (
    <div>
      {/* write code here */}
      <input
        type="text"
        placeholder="Enter todo"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></input>
      <button onClick={() => addTodoItem()}>Add</button>
      <ul>
        {todoList.map((t) => (
          <li key={t.id}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleCompleted(t.id)}
            />
            <span className={t.completed ? 'strikeThrough' : ''}>{t.text}</span>
            <button onClick={() => deleteTodo(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList
