import { Button, Input, useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  
} from "@chakra-ui/react";

interface TodoItem {
    t_id?:number
    description:string

}
const useEditDialog = ({setReloadPage,reloadPage}: {setReloadPage:(boolean)=>void,reloadPage:boolean}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<null | HTMLElement|any>();
  const [todoInfo,setTodoInfo] = useState<TodoItem>({
        t_id:undefined,
        description:""
  })
let editOpenHandler = async(description:string,t_id:number)=>{
    setTodoInfo({description,t_id})
    onOpen()

}
let editCloseHandler =()=>{
    
    setTodoInfo({description:"",t_id:undefined})
    onClose()
}
  let submitEditHandler = async()=>{

    if(todoInfo.t_id == undefined){
        console.log("t_id is undefined")
        return
    }
    try{
        let options = {
            method:"PUT",
            body:JSON.stringify({description:todoInfo.description}),
            headers:{"Content-Type":"application/json"}
        }
        const res = await fetch(`${process.env.BACKEND_LINK}todo/${todoInfo.t_id}`,options)
        if(res.status == 200){
            console.log("Todo has been updated successfully")
        }else{
            console.log("Error in updating todo",res.status)
        }

        setReloadPage(!reloadPage)

    }catch(err){
        console.error(err)
        
    }
  }
  let EditModal = (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={editCloseHandler}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Edit Todo
          </AlertDialogHeader>
          <AlertDialogBody>
            <Input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                setTodoInfo({...todoInfo,description:e.target.value})
            }}
            value = {todoInfo.description}
            />
    
          </AlertDialogBody>
          
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={editCloseHandler}>
              Cancel
            </Button>
            <Button colorScheme="yellow" onClick={()=>{
                submitEditHandler()
                onClose()
                
                }} ml={3}>
              Edit
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
  return {  EditModal ,editOpenHandler};
};
export default useEditDialog;
