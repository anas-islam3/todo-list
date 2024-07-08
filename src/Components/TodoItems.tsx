import React, { useContext, useState } from "react";
import { addNew, arrow, deleteIcon } from "../assets";
import { Todo, UserContext } from "./UserProvider";
import { validateTodo } from "../utils/utils";

interface TodoItemProps {
  todo: {
    id: number;
    text: string;
    isCompleted: boolean;
    subTodos: SubTodo[];
  };
  idx: number;
  showTodo: number;
  setShowTodo: React.Dispatch<React.SetStateAction<number>>;
  onDelete: (id: number) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  onToggle: (id: number) => void;
}

export interface SubTodo {
  id: number;
  text: string;
  isCompleted: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({
  idx,
  todo,
  showTodo,
  onDelete,
  onToggle,
  setTodos,
  setShowTodo,
}) => {
  const [newTodo, setNewTodo] = useState<string>("");
  const [addNewTodo, setAddNewTodo] = useState<boolean>(false);
  const [signError, setSignError] = useState<string>("");
  const [isShowTodo, setIsShowTodo] = useState<boolean>(false);

  const { todos } = useContext(UserContext);
  const handleDelete = () => {
    onDelete(todo.id);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignError("");
    setNewTodo(event.target.value);
  };

  const handleAddTodo = () => {
    const newT = newTodo.trim();
    const ValidTodo = validateTodo(todos, newT);
    if (ValidTodo) {
      setSignError(ValidTodo);
      return;
    }

    if (newT === "") {
      setAddNewTodo(false);
      return;
    }

    const subTodo: SubTodo = {
      id: Date.now(),
      text: newTodo,
      isCompleted: false,
    };

    const updatedTodo: Todo = {
      ...todo,
      subTodos: [...todo.subTodos, subTodo],
    };

    setTodos((prev) => {
      return prev.map((item) => (todo.id === item.id ? updatedTodo : item));
    });
    setNewTodo("");
    setAddNewTodo(false);
    setIsShowTodo(true);
  };

  const handleSubTodoDelete = (id: number) => {
    const updatedTodos = todo.subTodos.filter((item) => item.id !== id);
    const updatedTodo: Todo = {
      ...todo,
      subTodos: [...updatedTodos],
    };
    setTodos((prev) => {
      return prev.map((item) => (todo.id === item.id ? updatedTodo : item));
    });
  };

  const handleToggleSubTodo = (id: number) => {
    const updatedTodos = todo.subTodos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    const updatedTodo: Todo = {
      ...todo,
      subTodos: [...updatedTodos],
    };
    setTodos((prev) => {
      return prev.map((item) => (todo.id === item.id ? updatedTodo : item));
    });
  };

  return (
    <div>
      <div
        className="card"
        style={{ display: "flex", alignItems: "center", marginTop: 10 }}
      >
        <img
          src={arrow}
          className="dropdown"
          alt="drop"
          style={{ transform: !isShowTodo ? "rotate(270deg)" : "" }}
          onClick={() => setIsShowTodo(!isShowTodo)}
        />

        <span
          className={`todos`}
          style={{
            textDecoration: todo.isCompleted ? "line-through" : "none",
          }}
          onClick={() => setShowTodo(idx)}
        >
          {todo.text}
        </span>
        <img
          className="add_image"
          onClick={() => setAddNewTodo(true)}
          src={addNew}
          alt="add"
          style={{ height: 28 }}
        />
        <img
          src={deleteIcon}
          alt="delete"
          className="delete_icon"
          onClick={handleDelete}
        />
      </div>
      <ul>
        {todo.subTodos.map(
          (subTodo) =>
            isShowTodo && (
              <div
                className="card"
                key={subTodo.id}
                style={{ display: "flex", alignItems: "center", marginTop: 10 }}
              >
                <input
                  type="checkbox"
                  className="checkbox"
                  name={todo.text}
                  onClick={() => handleToggleSubTodo(subTodo.id)}
                />
                <span
                  className={`subtodos ${
                    subTodo.isCompleted ? "done" : "active"
                  }`}
                  style={{
                    textDecoration: subTodo.isCompleted
                      ? "line-through"
                      : "none",
                  }}
                >
                  {subTodo.text}
                </span>
                {subTodo.isCompleted && (
                  <img
                    src={deleteIcon}
                    alt="delete"
                    className="delete_icon"
                    onClick={() => handleSubTodoDelete(subTodo.id)}
                  />
                )}
              </div>
            )
        )}
      </ul>
      {addNewTodo && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            value={newTodo}
            onBlur={handleAddTodo}
            onChange={handleInputChange}
            placeholder="Add new sub-todo"
          />
          <img
            src={deleteIcon}
            alt="delete"
            className="delete_icon"
            onClick={() => setAddNewTodo(false)}
          />
        </div>
      )}
      <p
        className="error"
        style={{
          display: signError ? "block" : "none",
          margin: 2,
          color: "black",
        }}
      >
        *{signError}
      </p>
    </div>
  );
};

export default TodoItem;
