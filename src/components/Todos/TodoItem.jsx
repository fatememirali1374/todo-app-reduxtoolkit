import { useDispatch } from "react-redux";
import {
  deleteAsyncTodo,
  toggleAsyncTodos,
} from "../features/todo/todoSlice";

const TodoItem = ({ id, title, completed }) => {
  const dispatch = useDispatch();
  return (
    <li className={`list-group-item ${completed && "list-group-item-success"}`}>
      <div className="d-flex justify-content-between">
        <span className="d-flex align-items-center gap-1">
          <input
            onChange={(e) =>
              dispatch(toggleAsyncTodos({ id, completed: !completed }))
            }
            type="checkbox"
            className="mr-3"
            checked={completed}
          ></input>
          <span>{title}</span>
        </span>
        <button
          onClick={() => dispatch(deleteAsyncTodo({ id }))}
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
