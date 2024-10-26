import { useContext } from "react";
import { resourceContext } from "../contexts/resource";

export function useResource(){
    return useContext(resourceContext)
}