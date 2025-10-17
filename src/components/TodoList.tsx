import type React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { createTodo } from "../redux/todoReducer";

const TodoList: React.FC = () => {
    const todoList = useSelector((state: RootState) => state.todoList.todos);
    const dispatch = useDispatch<AppDispatch>();

    const handleAddTodo = () => {
        dispatch(createTodo());
    };

    return (
        <div>
            <h1>Todo List</h1>
            <button onClick={handleAddTodo}>Add Todo</button>
            
            <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f0f0f0' }}>
                        <th>ID</th>
                        <th>Description</th>
                        <th>Completed</th>
                        <th>Due Date</th>
                    </tr>
                </thead>
                <tbody>
                    {todoList.map((todo) => (
                        <tr key={todo.id}>
                            <td>{todo.id}</td>
                            <td>{todo.description}</td>
                            <td>
                                {todo.completed ? '✅' : '❌'}
                            </td>
                            <td>
                                {todo.dueDate || 'No due date'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {todoList.length === 0 && (
                <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
                    No todos yet. Click "Add Todo" to get started!
                </p>
            )}
        </div>
    );
};

export default TodoList;