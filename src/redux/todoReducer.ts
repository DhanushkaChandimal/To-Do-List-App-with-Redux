import { createSlice } from "@reduxjs/toolkit";

interface Todo {
    id: string;
    description: string;
    completed: boolean;
    dueDate: string | null;
};

interface TodoState {
    todos: Todo[];
    loading: boolean;
    error: string | null;
};

const initialState: TodoState = {
    todos: [],
    loading: false,
    error: null,
};

const todoReducer = createSlice ({
    name: 'todoList',
    initialState,
    reducers: {
        createTodo: (state, action) => {
            state.todos.push({
                id: Date.now().toString(),
                description: action.payload.description,
                completed: false,
                dueDate: action.payload.dueDate || null
            })
        },
    },

});

export const { createTodo } = todoReducer.actions;
export default todoReducer.reducer;