import { useEffect, useState } from "react";
interface useTodoListParams {
  reloadPage: boolean;
}
type ITodoList = [] | { t_id: number; description: string }[];
const useTodoList = ({ reloadPage }: useTodoListParams) => {
 const [todoItems,setTodoItems]=useState<ITodoList>([]);
    const fetchItems = async () => {
    const options = {
      headers: { "Content-Type": "application/json" },
    };

    const res = await fetch(`${process.env.BACKEND_LINK}todos`, options);
    const resData = await res.json();
    console.log("resData", resData);
    setTodoItems(resData)  
};

  useEffect(() => {
    fetchItems()
  }, [reloadPage]);

  return {}
};
export default useTodoList;
