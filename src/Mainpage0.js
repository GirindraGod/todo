import React, { useState, useEffect, useRef } from 'react';
import './Mainpage0.css';
import Todo from './Todo';
import Todo0 from './Todo0';
import TodoList from './TodoList';



function Mainpage0() {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);


/*second button */

  const [isOpen0, setIsOpen0] = useState(false);
  const popupRef0 = useRef(null);

  const openModal0 = () => {
    setIsOpen0(true);
  };

  const closeModal0 = () => {
    setIsOpen0(false);
  };

  const handleClickOutside0 = (event) => {
    if (popupRef0.current && !popupRef0.current.contains(event.target)) {
      closeModal0();
    }
  };

  useEffect(() => {
    if (isOpen0) {
      document.addEventListener('mousedown', handleClickOutside0);
    } else {
      document.removeEventListener('mousedown', handleClickOutside0);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside0);
    };
  }, [isOpen0]);

  const [todos, setTodos] = useState(() => {
    // Retrieve the initial todos from local storage, if any
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });


  useEffect(() => {
    // Save todos to local storage whenever they change
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);


  const addTodo = (input) => {
    if (input) {
      setTodos([...todos, { text: input, completed: false }]);
    }
  };

  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
    if (newTodos[index].completed) { 
      setTimeout(() => { 
        removeTodo(index);
       }, 500); 
      }
  };

  const removeTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };






  return (
    <div>
      <div className="newtask">
      <h2 className='mainheading0'>Tasks</h2>
      <div className='list0'>
         
         <TodoList todos={todos} toggleComplete={toggleComplete} removeTodo={removeTodo} />

      </div>
      
    
      <h2 className="mainheading1">Quick Task</h2>
      <h2 className="mainheading2">New Task</h2>
      <button id='openpage0' className='openpage0' onClick={openModal}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/>
        </svg>
      </button>
      {isOpen && (
        <div id='popup0' className='popup0' ref={popupRef}>
          <div className='info0'>
            <Todo />
            <button id='popupclose0' className='popupclose0' onClick={closeModal}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/>
              </svg>
            </button>
          </div>
        </div>
      )}
      </div>
      <div>
      <div  className="quick task">
      <button id='openpage1' className='openpage1' onClick={openModal0}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/>
        </svg>
      </button>
      {isOpen0 && (
        <div id='popup1' className='popup1' ref={popupRef0}>
          <div className='info1'>
             <Todo0 addTodo={addTodo} />
            <button id='popupclose1' className='popupclose1' onClick={closeModal0}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/>
              </svg>
            </button>
          </div>
        </div>
      )}
      </div>
      
    
    </div>
      
    
    </div>
    
  );
}

export default Mainpage0;
