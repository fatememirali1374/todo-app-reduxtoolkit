import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    loading: false,
    todos: [],
    error: ""
}

const api = axios.create({
    baseURL: " http://localhost:5000"
})


export const getAsyncTodos = createAsyncThunk("user/getAsyncTodos",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get(
                "/todos")
            return res.data
        } catch (error) {
            return rejectWithValue(error.message)
            // in really app error.response.data.message
        }
    });
export const addAsyncTodo = createAsyncThunk("user/addAsyncTodo",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await api.post(
                "/todos", {
                title: payload.title,
                id: Date.now(),
                completed: false
            })
            return res.data
        } catch (error) {
            return rejectWithValue(error.message)
            // in really app error.response.data.message
        }
    })
export const toggleAsyncTodos = createAsyncThunk("user/toggleAsyncTodos",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await api.patch(
                `/todos/${payload.id}`, {
                completed: payload.completed
            })
            return res.data
        } catch (error) {
            return rejectWithValue(error.message)
            // in really app error.response.data.message
        }
    })
export const deleteAsyncTodo = createAsyncThunk("user/deleteAsyncTodo",
    async (payload, { rejectWithValue }) => {
        try {
            await api.delete(
                `/todos/${payload.id}`)
            return { id: payload.id }

        } catch (error) {
            return rejectWithValue(error.message)
            // in really app error.response.data.message
        }
    })

const todoSlice = createSlice({
    name: "todos",
    initialState,
    // readucer for sync data
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
            selectedTodo.completed = action.payload.completed
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload.id)
        }
    },
    // extraReducers for asyns data
    extraReducers: builder => {
        // getAsyncTodos
        // pending
        builder.addCase(getAsyncTodos.pending, (state, action) => {
            state.loading = true,
                state.todos = [],
                state.error = ""

        },)
        // success=>fullfiles
        builder.addCase(getAsyncTodos.fulfilled, (state, action) => {
            state.loading = false,
                state.todos = action.payload,
                state.error = ""
        },)
        // rejected
        builder.addCase(getAsyncTodos.rejected, (state, action) => {
            state.loading = false,
                state.todos = [],
                state.error = action.payload
        })
        // addAsyncTodo
        // pending
        builder.addCase(addAsyncTodo.pending, (state, action) => {
            state.loading = true

        },)
        // success=>fullfiles
        builder.addCase(addAsyncTodo.fulfilled, (state, action) => {
            state.loading = false,
                state.todos.push(action.payload)
        },)



        // deleteAsyncTodo
        // pending
        builder.addCase(deleteAsyncTodo.pending, (state, action) => {
            state.loading = true

        },)
        // success=>fullfiles
        builder.addCase(deleteAsyncTodo.fulfilled, (state, action) => {
            state.loading = false
            state.todos = state.todos.filter(todo => todo.id !== Number(action.payload.id))
        },)
        // toggleAsyncTodos
          // pending
          builder.addCase(toggleAsyncTodos.pending, (state, action) => {
            state.loading = true

        },)
        // success=>fullfiles
        builder.addCase(toggleAsyncTodos.fulfilled, (state, action) => {
            state.loading = false
            const selectedTodo =state.todos.find((todo)=>todo.id===Number(action.payload.id))
        selectedTodo.completed=action.payload.completed
        },)

    }
})

export const { addTodo, deleteTodo, toggleTodo } = todoSlice.actions

export default todoSlice.reducer