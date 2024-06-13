import { useEffect, useState } from "react";
interface useTodoListParams {
  reloadPage: boolean;
}
export type ITodoList = null|[] | { t_id: number; description: string }[];
const useTodoList = ({ reloadPage }: useTodoListParams) => {
 const [todoItems,setTodoItems]=useState<ITodoList>([]);
    const fetchItems = async () => {
    const options = {
      headers: { "Content-Type": "application/json" },
    };
try{

  const res = await fetch(`${process.env.BACKEND_LINK}todos`, options);
  const resData = await res.json();
  if(res.status == 200){
    console.log("resData", resData);
    setTodoItems(resData.items)  
  
  }else{
    console.log("Error fetching data")
  }
}catch(err){
console.error(err)
}
};

  useEffect(() => {
    fetchItems()
  }, [reloadPage]);

  return {todoItems}
};
export default useTodoList;
