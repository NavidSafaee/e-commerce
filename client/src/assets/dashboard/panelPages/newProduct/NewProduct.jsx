import React from 'react'
import './NewProduct.css'

export default function NewProduct() {
  return (
    <>
      <div className="form">
        {/* <form onSubmit={addTodo}> */}
        <form>
          <input
            type="text"
            className="todo-input"
            maxLength="40"
            // value={todoTitle}
            // onChange={todoTitleHandler}
          />
          <button className="todo-button" type="submit">
            {/* Done */}
            <i className="fas fa-plus-square"></i>
          </button>
          <div className="select">
            {/* <select name="todos" className="filter-todo" onChange={statusHandler}> */}
            {/* <select name="todos" className="filter-todo"> */}
              {/* <option value="all">All</option> */}
              {/* <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="uncompleted">Uncompleted</option>
            </select> */}
          </div>
        </form>
      </div>
    </>
  )
}
