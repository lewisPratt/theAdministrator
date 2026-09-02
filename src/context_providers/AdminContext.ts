import { createContext, type Dispatch, type SetStateAction } from "react";


interface adminContextShape{
    adminName: string
    setAdminName: Dispatch<SetStateAction<string>> 
}

export const AdminContext = createContext<adminContextShape>({
    adminName: '',
    setAdminName: ()=>{}
})