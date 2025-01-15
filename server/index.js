const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const TodoModel = require('./models/Todo')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/test')

app.get('/get', (req, res) => {
  TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await TodoModel.findById(id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      id,
      { done: !todo.done },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json(err);
  }
});


app.delete('/delete/:id', (req,res)=>{
  const {id} =req.params;
  TodoModel.findByIdAndDelete({_id:id})
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

app.post('/add', (req,res) =>{
  const task = req.body.task;
  TodoModel.create({
    task:task
  }).then(result => res.json(result))
  .catch(err => res.json(err))
})

app.listen(3001, ()=>{
  console.log("server is running")
})