import { useState, useEffect} from 'react';
import './App.css';
import Task from './components/Task';
import EditTask from './components/EditTask';

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
    const addData = async ()=>{
      const res= await fetch('https://jsonplaceholder.typicode.com/todos', {
            method:'POST',
            body:JSON.stringify({
              "userId": 1,
              "id": Date.now(),
              "title": value,
              "completed": false,
              "isEditing":false,
            }),
            headers:{
              'Content-type': 'application/json; charset=UTF-8',
            },
      })
      if(res.ok)
        console.log("added");
    }
    addData();
    setTasks([...tasks, {
        "id": Date.now(),
        "title": value,
        "completed": false,
        "isEditing":false}
         ]);
    setValue('');
  }

  function isEditing(taskId){
    setTasks( tasks.map(task => task.id === taskId ? {...task, isEditing:true} : {...task,isEditing:false } ) );
  }

  function updateTask(taskId,value){
    const updateData = async ()=>{
      const res= await fetch('https://jsonplaceholder.typicode.com/todos/1', {
            method:'PUT',
            body:JSON.stringify({
              "userId": 1,
              "id": Date.now(),
              "title": value,
              "completed": false,
              "isEditing":false,
            }),
            headers:{
              'Content-type': 'application/json; charset=UTF-8',
            },
      })
      if(res.ok)
        console.log("updated");
    }
    updateData();
    setTasks( tasks.map(task => task.id === taskId ? {...task, title:value , isEditing:false} : task ) );
  }

  function toggleTask(taskId){
    setTasks( tasks.map( task =>  task.id === taskId ? {...task , completed: !task.completed } : task ) );
  }

  function deleteTask(taskId){

    const remove = async() => {
        const res = await fetch(`https://jsonplaceholder.typicode.com/todos/1`, {
          method: 'DELETE',
        });
        if(res.ok)
          console.log("deleted");
    }
    remove();
    const newTasks = tasks.filter(function (task) {
        return task.id !== Number(taskId);
    });
    setTasks(newTasks);
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
              task.isEditing ?
              <EditTask key={task.id} task={task} update={updateTask} />
              :
              <Task key={task.id} task={task} deleteTask={deleteTask} toggleTask={toggleTask} isEditing={isEditing} />
            ))
          }
        </ul>
      </div>
      
    </div>
  );
}

export default App;
