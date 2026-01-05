import { getTodos } from '../services/todo.service';
import { useEffect, useState } from 'react';
import DoneButton from './DoneButton.component';

const TodoList = () => {
  const [todoItems, setTodoItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) return <p>Loading todos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {todoItems.length === 0
        ? (
          <h2>No todos yet!</h2>
          )
        : (
          <>
            {todoItems.some((item) => item.status !== 'done') && (
              <>
                <h2>Todo Items</h2>
                <ul>
                  {todoItems
                    .filter((item) => item.status !== 'done')
                    .map((item) => (
                      <li key={item.id}>
                        {item.title}
                        <DoneButton todoItem={item} onDone={fetchTodos} />
                      </li>
                    ))}
                </ul>
              </>
            )}
            {todoItems.some((item) => item.status === 'done') && (
              <>
                <h2>Done Items</h2>
                <ul>
                  {todoItems
                    .filter((item) => item.status === 'done')
                    .map((item) => (
                      <li key={item.id}>{item.title}</li>
                    ))}
                </ul>
              </>
            )}
          </>
          )}
    </div>
  );
};

export default TodoList;
