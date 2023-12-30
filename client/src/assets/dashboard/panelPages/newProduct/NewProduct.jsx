import React from 'react'
import './NewProduct.css'

export default function NewProduct() {
  return (
    <>
      <div className="form">
        <form>
          <input
            type="text"
            className="todo-input"
            maxLength="40"
          />
          <button className="todo-button" type="submit">
            <i className="fas fa-plus-square"></i>
          </button>
          <div className="select">
           
          </div>
        </form>
      </div>
    </>
  )
}
