import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Todo from "./Components/TodoList";
import Login from "./Components/Login";
import { UserProvider } from "./Components/UserProvider";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Todo />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
