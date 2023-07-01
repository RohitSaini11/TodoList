import { useState, useEffect} from 'react';
import './App.css';
// import FetchData from './components/Fetchdata';
import Task from './components/Task';
function App() {
  let [tasks,setTasks] = useState([]);
  let [value,setValue] = useState('');
  
  useEffect(() =>{
        const getData = async () =>{
            const res = await fetch('https://jsonplaceholder.typicode.com/todos');
            if(!res.ok) throw new Error("Oops! An erro has occured");
            const json = await res.json();
            
            setTasks(json.slice(0,4));
        }
        getData();
  },[]);

  const handleSubmit = e =>{
    e.preventDefault();

    if(value!==''){
      addTask();
    }
  
  }
  function addTask(){
    setTasks([...tasks, {
        "id": Date.now(),
        "title": value,
        "completed": false,
        "isEditing":false}
         ]);
    setValue('');
  }

  function editTask(taskId){
    console.log("edit mode for",taskId);
  }

  function toggleTask(taskId){
    setTasks( tasks.map( task =>  task.id === taskId ? {...task , completed: !task.completed } : task ) );
  }

  function deleteTask(taskId){
    const newTasks = tasks.filter(function (task) {
        return task.id !== Number(taskId);
    });
    setTasks(newTasks);
    console.log("called!!");
  }

  return (
    <div className="App">

      <h1>Todo List App</h1>
      <div id="container">
        <form onSubmit={handleSubmit}>
          <input placeholder="What is the task ?" className="add-task" id="add" value={value} onChange={(e)=> setValue(e.target.value)}/>
          <button className='add' type='submit'>Add</button>
        </form>
        <span id="total-tasks">Total tasks: <span id="tasks-counter">{tasks.length}</span></span>
        <ul id="list">
          { 
            tasks.map( (task) => (
              <Task key={task.id} task={task} deleteTask={deleteTask} toggleTask={toggleTask} editTask={editTask} />
            ))
          }
        </ul>
      </div>
      
    </div>
  );
}

export default App;
