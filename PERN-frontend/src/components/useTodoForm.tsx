import { useState } from "react";
import { Button, Input } from "@chakra-ui/react";
const useTodo = ()=>{
const [desc,setDesc] = useState("");
const [reloadPage,setReloadPage] = useState(false);
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

}
let toDoComponent = (
    <div>
        <Input type="text" value={desc} onChange={(e)=>setDesc(e.target.value)} />
        <Button colorScheme="teal" onClick={addTodo}>Add</Button>
    </div>
)
    return {toDoComponent}
}

export default useTodo;