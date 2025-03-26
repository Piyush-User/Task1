import React, { useEffect, useState } from 'react';
import { fetchTasks, updateTask, deleteTask } from '../utils/api';

const TaskLists = ({ refresh }) => {
    const [tasks, setTasks] = useState([]);
    const [editTaskId, setEditTaskId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchTasks().then(res => setTasks(res.data));
    }, [refresh]);

    const handleComplete = (task) => {
        updateTask(task._id, { ...task, completed: !task.completed }).then(() => refresh());
    };

    const handleDelete = (id) => {
        deleteTask(id).then(() => refresh());
    };

    const handleEdit = (task) => {
        setEditTaskId(task._id);
        setEditTitle(task.title);
        setEditDescription(task.description);
    };

    const handleSaveEdit = () => {
        if (!editTitle.trim()) return;
        updateTask(editTaskId, { title: editTitle, description: editDescription })
            .then(() => {
                setEditTaskId(null);
                refresh();
            })
            .catch((error) => console.error('Error updating task:', error));
    };

    const filteredTasks = tasks.filter(task => 
        filter === 'all' ? true : filter === 'completed' ? task.completed : !task.completed
    );

    return (
        <div className="mt-4">
            {/* Filter Buttons */}
            <div className="flex justify-center space-x-4 mb-4">
                <button className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => setFilter('all')}>All</button>
                <button className={`px-4 py-2 rounded-md ${filter === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-200'}`} onClick={() => setFilter('completed')}>Completed</button>
                <button className={`px-4 py-2 rounded-md ${filter === 'incomplete' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`} onClick={() => setFilter('incomplete')}>Incomplete</button>
            </div>

            {filteredTasks.map(task => (
                <div key={task._id} className="bg-gray-100 p-4 rounded-lg shadow-md mb-2 flex justify-between items-center">
                    {editTaskId === task._id ? (
                        // Edit Mode
                        <div className="flex-1">
                            <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md mb-2"
                            />
                            <textarea
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    ) : (
                        // View Mode
                        <div>
                            <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500' : ''}`}>
                                {task.title}
                            </h3>
                            <p className="text-gray-600">{task.description}</p>
                        </div>
                    )}

                    <div className="flex gap-2">
                        {editTaskId === task._id ? (
                            <button onClick={handleSaveEdit} className="bg-blue-500 text-white px-3 py-1  ml-3 rounded-md hover:bg-blue-600">
                                Save
                            </button>
                        ) : (
                            <>
                                <button onClick={() => handleComplete(task)} className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">
                                    {task.completed ? '✔' : 'Complete'}
                                </button>
                                <button onClick={() => handleEdit(task)} className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(task._id)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskLists;

