import { getTodos } from '../services/todo.service';
import { useEffect, useState } from 'react';

const TodoList = () => {
  const [todoItems, setTodoItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const data = await getTodos();
        setTodoItems(data?.todos || []);
      } catch (err) {
        setError('Failed to load todos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  if (loading) return <p>Loading todos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {todoItems.length === 0
        ? (
          <li>No todos yet!</li>
          )
        : (
            todoItems.map((item) => (
              <li key={item.id}>
                {item.title}
                <small> - {new Date(item.createdat).toLocaleDateString()}</small>
              </li>
            ))
          )}
    </ul>
  );
};

export default TodoList;
