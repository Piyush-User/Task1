import axios from 'axios';

const URL = 'http://localhost:5000';
// const API_URL = 'http://localhost:5000/tasks';
const API_URL = `${URL}/tasks`;

export const fetchTasks = () => axios.get(API_URL);
export const addTask = (task) => axios.post(API_URL, task);
export const updateTask = (id, updatedTask) => axios.put(`${API_URL}/${id}`, updatedTask);
export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);