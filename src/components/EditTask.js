import { useState } from "react";


function EdtiTask({ task,update }){
    const [value,setValue] = useState(task.title);

    const handleSubmit = e =>{
        e.preventDefault();
        if( value !== ''){
            update(task.id,value);
        }
    }

    return(
        <form onSubmit={ handleSubmit }>
            <input placeholder="" className="add-task" id="add" value={value} onChange={(e)=> setValue(e.target.value)}/>
            <button className='add' type='submit'>Update </button>
        </form>
    );
}


export default EdtiTask;