import React, {useState} from 'react'
import { addTask } from '../utils/api';

const TaskForm = ({ refresh }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title) return;
        addTask({ title, description }).then(() => {
            setTitle('');
            setDescription('');
            refresh();
        });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
            <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 mb-2 border border-gray-300 rounded-md"
            />
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                Add Task
            </button>
        </form>
    );
};

export default TaskForm;

