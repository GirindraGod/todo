// src/Todo.js
import React, { useState, useEffect } from 'react';

function Todo() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      setTodos(savedTodos);
    }

    const timer = setInterval(() => {
      const now = new Date().getTime();
      todos.forEach(todo => {
        const taskTime = new Date(`${todo.date}T${todo.time}`).getTime();
        if (taskTime <= now && !todo.notified) {
          notifyUser(todo.task);
          todo.notified = true;
          setTodos([...todos]);
          localStorage.setItem('todos', JSON.stringify([...todos]));
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [todos]);

  const addTodo = (event) => {
    event.preventDefault();
    if (input && date && time) {
      const newTodo = { task: input, date, time, completed: false, notified: false };
      const newTodos = [...todos, newTodo];
      setTodos(newTodos);
      localStorage.setItem('todos', JSON.stringify(newTodos));
      setInput('');
      setDate('');
      setTime('');
    }
  };

  const notifyUser = (task) => {
    if (Notification.permission === 'granted') {
      new Notification(`Time for: ${task}`);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification(`Time for: ${task}`);
        }
      });
    }
  };

  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  return (
    <div>
      <h1 className='heading0'>Todo List</h1>
      <form onSubmit={addTodo}>
        <input className='info0'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a todo"
        />
        <input 
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input 
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            <input 
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(index)}
            />
            {todo.task} - {todo.date} {todo.time}
            <button onClick={() => deleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
