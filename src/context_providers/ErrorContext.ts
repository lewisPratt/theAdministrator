import { createContext, type Dispatch, type SetStateAction} from "react";
import type{ errorStateShape } from "../interfaces/interfaces";


export const ErrorContext = createContext<errorStateShape>({
    errorState: "",
    setErrorState: ()=>{}
})