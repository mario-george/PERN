"use client"
import useTodoForm from "@/components/useTodoForm";
import { Text } from '@chakra-ui/react'

export default function Home() {
const {TodoFormComponent} =useTodoForm();
  return (
   <>
  <Text fontSize='3xl' className="p-3 m-3">Add a todo task</Text>


   {TodoFormComponent}
   </>
  );
}
