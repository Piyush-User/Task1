import React, {useState} from "react";
import TaskForm from "./Components/TaskForm";
import TaskLists from "./Components/TaskLists";


function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const handleRefresh = () => setRefreshKey(prev => prev + 1);
  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Task Manager</h1>
        <TaskForm refresh={handleRefresh} />
        <TaskLists refresh={handleRefresh} refreshKey={refreshKey} /> 
    </div>
    </div>
  );
}

export default App;
