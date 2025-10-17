import type React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { createTodo, toggleTodo } from "../redux/todoReducer";

const TodoList: React.FC = () => {
    const todoList = useSelector((state: RootState) => state.todoList.todos);
    const dispatch = useDispatch<AppDispatch>();
    
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");

    const handleAddTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (description.trim()) {
            dispatch(createTodo({
                description: description.trim(),
                dueDate: dueDate || null
            }));
            setDescription("");
            setDueDate("");
        }
    };

    const handleToggleTodo = (id: string) => {
        dispatch(toggleTodo(id));
    };

    return (
        <div>
            <h1>Todo List</h1>
            
            <form onSubmit={handleAddTodo} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
                <h3>Add New Todo</h3>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="description" style={{ display: 'block', marginBottom: '5px' }}>
                        Description:
                    </label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter todo description..."
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="dueDate" style={{ display: 'block', marginBottom: '5px' }}>
                        Due Date (optional):
                    </label>
                    <input
                        type="date"
                        id="dueDate"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>
                <button 
                    type="submit" 
                    style={{ 
                        backgroundColor: '#007bff', 
                        color: 'white', 
                        padding: '10px 20px', 
                        border: 'none', 
                        borderRadius: '4px', 
                        cursor: 'pointer' 
                    }}
                >
                    Add Todo
                </button>
            </form>
            
            <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f0f0f0' }}>
                        <th>ID</th>
                        <th>Description</th>
                        <th>Completed</th>
                        <th>Due Date</th>
                        <th>Actions</th>
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
                            <td>
                                <button
                                    onClick={() => handleToggleTodo(todo.id)}
                                    style={{
                                        backgroundColor: todo.completed ? '#28a745' : '#ffc107',
                                        color: 'white',
                                        border: 'none',
                                        padding: '5px 10px',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize: '12px'
                                    }}
                                >
                                    {todo.completed ? 'Mark Undone' : 'Mark Done'}
                                </button>
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