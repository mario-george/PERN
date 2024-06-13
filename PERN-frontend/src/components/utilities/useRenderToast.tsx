import { useToast } from "@chakra-ui/react";
interface useRenderToastProps {
    title: string;
    description: string;
    
}
const useRenderToast = ({title,description} :useRenderToastProps)=>{
    const toast = useToast();

    const renderToast = ()=>{
        toast({
            title,
            description,
            status: "success",
            duration: 2000,
            isClosable: true,
            variant:"top-accent"
          })
    }
    return {renderToast}
}
export default useRenderToast