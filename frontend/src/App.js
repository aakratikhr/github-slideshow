import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks. Make sure the backend is running.');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) {
      alert('Please enter a task title');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/tasks`, newTask);
      setTasks([...tasks, response.data.data]);
      setNewTask({ title: '', description: '' });
      setError(null);
    } catch (err) {
      setError('Failed to create task');
      console.error('Error creating task:', err);
    }
  };

  const handleUpdateTask = async (id, updates) => {
    try {
      const response = await axios.put(`${API_URL}/tasks/${id}`, updates);
      setTasks(tasks.map(task => task.id === id ? response.data.data : task));
      setEditingTask(null);
      setError(null);
    } catch (err) {
      setError('Failed to update task');
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete task');
      console.error('Error deleting task:', err);
    }
  };

  const toggleTaskComplete = (task) => {
    handleUpdateTask(task.id, { completed: !task.completed });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>📝 Task Manager</h1>
        <p>Manage your tasks efficiently</p>
      </header>

      <main className="App-main">
        {error && <div className="error-message">{error}</div>}

        <div className="task-form-container">
          <h2>Add New Task</h2>
          <form onSubmit={handleCreateTask} className="task-form">
            <input
              type="text"
              placeholder="Task Title *"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="input-field"
            />
            <textarea
              placeholder="Task Description (optional)"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="input-field textarea-field"
              rows="3"
            />
            <button type="submit" className="btn btn-primary">Add Task</button>
          </form>
        </div>

        <div className="tasks-container">
          <h2>Tasks ({tasks.length})</h2>
          {loading ? (
            <div className="loading">Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div className="no-tasks">No tasks yet. Add your first task above!</div>
          ) : (
            <div className="tasks-list">
              {tasks.map(task => (
                <div key={task.id} className={`task-card ${task.completed ? 'completed' : ''}`}>
                  {editingTask === task.id ? (
                    <div className="task-edit">
                      <input
                        type="text"
                        defaultValue={task.title}
                        onBlur={(e) => handleUpdateTask(task.id, { title: e.target.value })}
                        className="input-field"
                      />
                      <textarea
                        defaultValue={task.description}
                        onBlur={(e) => handleUpdateTask(task.id, { description: e.target.value })}
                        className="input-field textarea-field"
                        rows="2"
                      />
                      <button onClick={() => setEditingTask(null)} className="btn btn-secondary">
                        Done Editing
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="task-header">
                        <h3 className="task-title">{task.title}</h3>
                        <div className="task-actions">
                          <button
                            onClick={() => toggleTaskComplete(task)}
                            className="btn btn-icon"
                            title={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
                          >
                            {task.completed ? '✓' : '○'}
                          </button>
                          <button
                            onClick={() => setEditingTask(task.id)}
                            className="btn btn-icon"
                            title="Edit task"
                          >
                            ✎
                          </button>
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="btn btn-icon btn-danger"
                            title="Delete task"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                      {task.description && (
                        <p className="task-description">{task.description}</p>
                      )}
                      <div className="task-status">
                        Status: <span className={task.completed ? 'status-completed' : 'status-pending'}>
                          {task.completed ? 'Completed' : 'Pending'}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="App-footer">
        <p>Task Manager Application - Full Stack Demo</p>
      </footer>
    </div>
  );
}

export default App;
