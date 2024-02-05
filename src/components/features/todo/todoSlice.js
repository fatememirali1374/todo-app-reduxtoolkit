import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    loding: false,
    todos: [],
    error: ""
}
const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                id: Date.now(),
                title: action.payload.title,
                completed: false
            };
    state.todos.push(newTodo)
        },
        toggleTodo: (state, action) => {
            const selectedTodo = state.todos.find((todo) => todo.id === action.payload.id)
            selectedTodo.completed = !selectedTodo.completed
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload.id)
        }
    },
})

export const { addTodo, deleteTodo, toggleTodo } = todoSlice.actions

export default todoSlice.reducer