import { useEffect, useState } from "react";

function FetchData(){
    const [tasks,setTasks] = useState([]);
    
    useEffect(() =>{
        const getData = async () =>{
            const res = await fetch('https://jsonplaceholder.typicode.com/todos');
            if(!res.ok) throw new Error("Oops! An erro has occured");
            const json = await res.json();
            
            setTasks(json.slice(0,10));
        }
        getData();
    },[]);

    return tasks;
}

export default FetchData;