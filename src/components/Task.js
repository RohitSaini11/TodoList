function Task({task, deleteTask, toggleTask, isEditing}){

    return(
        <li>
            {/* <input type="checkbox" { ...task.completed === "true" ? "checked" :""} className="custom-checkbox" onClick={ () => console.log("checkbox")}/> */}
            <label className={` ${ task.completed ? "completed": "" } `} onClick={ () => {toggleTask(task.id)} } >{task.title}</label>
            <div>
                <img src="edit-48.png" className="delete" data-id={task.id} alt="" onClick={ () => isEditing(task.id) } /> 
                <img src="delete.png" className="delete" data-id={task.id} alt="" onClick={ () => deleteTask(task.id) } /> 
            </div> 
        </li>
    );
}

export default Task;