import { SubTodo } from "../Components/TodoItems";
import { Todo } from "../Components/UserProvider";

export const validateTodo = (todos: Todo[], newTodo: string) => {
    let error = ''
    todos.forEach((todo: Todo , idx: number) => {
        if(todo.text === newTodo) return error ="Please enter unique todo name"
        todo.subTodos.forEach((subTodo: SubTodo , idx: number) => {
            if(subTodo.text === newTodo) return error ="Please enter unique todo name"
        })
    })
    return error
}