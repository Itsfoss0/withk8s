import { markAsDone } from '../services/todo.service';

const DoneButton = ({ todoItem, onDone }) => {
  const handleClick = async () => {
    await markAsDone(todoItem.id);
    if (onDone) onDone();
  };

  return <button onClick={handleClick}>Done</button>;
};

export default DoneButton;
