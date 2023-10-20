import React from 'react'

function SingleTodo({todo,updateHandler,deleteHandler}) {
  return (
    <div className='todo'>
      <div>
        <h4>{todo.title}</h4>
        <p>{todo.description }</p>
      </div>
      <div>
        <input type="checkbox" onChange={()=>updateHandler(todo._id)} checked={todo.isCompleted} />
        <button className='btn' onClick={()=>deleteHandler(todo._id)}>Delete</button>
      </div>
    </div>
  )
}

export default SingleTodo