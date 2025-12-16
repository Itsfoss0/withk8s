const db = require('../db');
const pinoLogger = require('../log/log');
const todoRouter = require('express').Router();

todoRouter.get('/todos', async (req, res) => {
  const timestamp = new Date().toISOString();
  const todoItems = (await db.query('SELECT * FROM todos')).rows;
  res.json({ todos: todoItems, timestamp });
});

todoRouter.post('/todos', async (req, res) => {
  try {
    const qry = 'INSERT INTO todos (title) VALUES ( $1 )';
    const data = req.body.todo;
    if (Number(data.length) > 140) {
      pinoLogger.error('error adding todo item');
      return res
        .status(400)
        .json({ error: 'todo length should be 140 characters or less' });
    }
    await db.query(qry, [data]);
    pinoLogger.info('todo item created');
    return res.status(201).json({ messsage: 'created', todo: data });
  } catch (err) {
    console.log(err);
  }
});

module.exports = todoRouter;
