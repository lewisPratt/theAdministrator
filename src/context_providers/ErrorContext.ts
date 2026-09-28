import { createContext} from "react";
import type{ errorStateShape } from "../interfaces/interfaces";


export const ErrorContext = createContext<errorStateShape>({
    errorState: "",
    setErrorState: ()=>{}
})