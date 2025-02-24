import { createTodo } from '../services/todo.service';

const TodoForm = () => {
  const handleCreateTodo = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const payload = Object.fromEntries(data);
    await createTodo(payload);
  };
  return (
    <>
      <form onSubmit={handleCreateTodo}>
        <label htmlFor='todo' />
        <input type='text' name='todo' />
        <input type='submit' value='Create' />
      </form>
    </>
  );
};

export default TodoForm;
