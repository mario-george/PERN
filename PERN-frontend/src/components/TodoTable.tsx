import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ITodoList } from "./useTodoList";
interface TodoTableProps {
  todoItems: ITodoList;
  description: string;
  setReloadPage: (val: boolean) => void;
  reloadPage: boolean;
  editOpenHandler: (description: string, t_id: number) => void;
}
export default function TodoTable({
  todoItems,
  description,
  setReloadPage,
  reloadPage,editOpenHandler
}: TodoTableProps) {
  const resetPageHandler = () => {
    setReloadPage(!reloadPage);
  };
  const editTodo = async (t_id: number) => {
    console.log("Edit todo with id", t_id);

    let options = {
      method: "PUT",
      body: JSON.stringify({ description }),
      headers: { "Content-Type": "application/json" },
    };
    const res = await fetch(`${process.env.BACKEND_LINK}todo/${t_id}`, options);
    if (res.status == 200) {
      // send a success model
      console.log("Todo has been updated successfully");
      resetPageHandler();
    }
  };
  const deleteTodo = async (t_id: number) => {
    console.log("Delete todo with id", t_id);
    let options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const res = await fetch(`${process.env.BACKEND_LINK}todo/${t_id}`, options);
    if (res.status == 200) {
      // send a success model
      console.log("Todo has been deleted successfully");
      resetPageHandler();
    }
  };
  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Description</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {todoItems && todoItems.length > 0 ? (
              todoItems.map((item) => (
                <Tr key={item.t_id}>
                  <Td>{item.description}</Td>
                  <Td>
                    <Button
                      colorScheme="cyan"
                      variant="outline"
                      onClick={() => {
                        // editTodo(item.t_id);
                        editOpenHandler( item.description, item.t_id);
                      }}
                    >
                      Edit
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      colorScheme="red"
                      variant="outline"
                      onClick={() => {
                        deleteTodo(item.t_id);
                      }}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))
            ) : (
              <>
                <Tr>
                  <Td>There are no items!</Td>
                </Tr>
              </>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
