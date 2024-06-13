import { useState } from "react";
import { Button, Input,  } from "@chakra-ui/react";
import useTodoList from "./useTodoList";
import TodoTable from "./TodoTable";
const useTodoForm = ()=>{
const [desc,setDesc] = useState("");
const [reloadPage,setReloadPage] = useState(false);
const {todoItems } = useTodoList({reloadPage});
let TodoTableProps ={
    todoItems,
    description:desc,
    setReloadPage,
    reloadPage

}
const addTodo =async ()=>{
    let options = {
        method:"POST",
        body:JSON.stringify({description:desc}),
        headers:{"Content-Type":"application/json"}
    }
    const res = await fetch(`${process.env.BACKEND_LINK}todos`,options)
    if(res.status ==201){
        console.log("Todo has been added successfully")
    }else{
        console.log("Error in adding todo",res.status)
    }
    const resData = await res.json();
    console.log("resData",resData)
 
    setDesc("");
    setReloadPage(!reloadPage);

}
let toDoComponent = (
    <div className="container flex space-x-3 p-3 my-3">
        <Input type="text" value={desc} onChange={(e)=>setDesc(e.target.value)} />
        <Button colorScheme="teal" onClick={addTodo}>Add</Button>
    </div>
)
let todoListTableComponent  = <TodoTable {...TodoTableProps} />
let TodoFormComponent = <>
{ toDoComponent}
{todoListTableComponent
}

</> 
    return {TodoFormComponent}
}

export default useTodoForm;