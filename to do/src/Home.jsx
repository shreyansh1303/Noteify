import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios'
import { MdDelete } from "react-icons/md";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import logo from '../src/assets/logo.png';

const Home = () => {
  const [todos, setTodos] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3001/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err))
  }, [])

  const handleEdit = (id) => {
    axios.put(`http://localhost:3001/update/${id}`)
      .then(result => {
        location.reload()
      })
      .catch(err => console.log(err))
  }

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then(result => {
        location.reload()
      })
      .catch(err => console.log(err))
  }

  return (
    <div className='base'>
      <div className='home'>
        <div className='head'>
          <img className='img' src={logo}></img>
          <div className='banner'>To-Do List</div>
        </div>
        <Create />
        {
          todos.length === 0
            ?
            <div><h2>No record Found</h2></div>
            :
            [...todos].reverse().map(todo => (
              <div className='task'>
                <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                  {
                    todo.done ? <IoCheckmarkDoneCircleSharp className='icon' /> : <MdOutlineRadioButtonUnchecked className='icon' />
                  }
                  <p className={todo.done ? "line" : ""}>{todo.task}</p>
                </div>
                <div>
                  <span onClick={() => handleDelete(todo._id)}><MdDelete className='icon' /></span>
                </div>
              </div>
            ))
        }
      </div>
    </div>
  )
}

export default Home
