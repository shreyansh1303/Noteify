import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toast'

function Create() {
  const[task,setTask] = useState()
  

  const handleAdd = ()=>{
    axios.post('http://localhost:3001/add', {task:task})
    .then(result => {
      location.reload()
    })
    .catch(err => console.log(err))
  }

  return (
    <div className='create_form'>
      <input className='writing' type="text" placeholder='Enter your task here' onChange={(e)=>setTask(e.target.value)}/>
      <button type="button" onClick={handleAdd}>Add</button>
    </div>
  )
}

export default Create
