import React, { createContext, useEffect, useState } from "react";

export interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
  subTodos: {
    id: number;
    text: string;
    isCompleted: boolean;
  }[];
}

interface UserContextProps {
  username: string;
  todos: Todo[];
  updateUsername: (args: string) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const UserContext = createContext<UserContextProps>({
  username: "",
  todos: [],
  updateUsername: () => {},
  setTodos: () => {},
});
type Props = {
  children: string | JSX.Element | JSX.Element[];
};
const UserProvider = ({ children }: Props) => {
  const [username, setUsername] = useState<string>("");

  const [todos, setTodos] = useState<Todo[]>(() => {
    const localData = localStorage.getItem("todoData");
    return localData ? JSON.parse(localData) : [];
  });

  const updateUsername = (args: string) => {
    setUsername(args);
  };

  useEffect(() => {
    if (todos.length) {
      localStorage.setItem("todoData", JSON.stringify(todos));
    }
  }, [todos]);

  return (
    <UserContext.Provider
      value={{
        username,
        todos,
        updateUsername,
        setTodos,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
