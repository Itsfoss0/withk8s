import { getTodos } from '../services/todo.service';
import { useEffect, useState } from 'react';

const TodoList = () => {
  const [todoItems, setTodoItems] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getTodos();
      console.log(data.todos);
      setTodoItems(data.todos);
    };
    fetchTodos();
  }, []);

  return (
    <ul>
      {todoItems &&
        todoItems.map((item) => {
          return <li key={item}>{item}</li>;
        })}
    </ul>
  );
};

export default TodoList;
