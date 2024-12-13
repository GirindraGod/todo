// src/Todo.js
import React, { useState } from 'react';
import './Todo0.css';

function Todo0({ addTodo }) {
  const [input, setInput] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    addTodo(input);
    setInput('');
  };

  return (
    <div>
      <h1 className='heading0'>Quick Task</h1>
      <form onSubmit={handleSubmit}>
        <input className='info0'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a Task"
        />
        <button className='button0' type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default Todo0;
