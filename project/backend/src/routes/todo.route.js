const todoRouter = require('express').Router();

const todoItems = [];

todoRouter.get('/todo', (req, res) => {
  const timestamp = new Date().toISOString();
  res.json({ todos: todoItems, timestamp });
});

todoRouter.post('/todo', (req, res) => {
  try {
    const data = req.body.todo;
    todoItems.push(data);
    return res.status(201).json({ messsage: 'created', todo: data });
  } catch (err) {
    console.log(err);
  }
});

module.exports = todoRouter;
