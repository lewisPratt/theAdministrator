import type { Dispatch, SetStateAction } from "react"

interface debugShape{
    generatePeople:Dispatch<SetStateAction<boolean>>
}
export default function DebugTools({generatePeople}: debugShape){

    return <button onClick={()=>{generatePeople(prev=>!prev)}}> Generate new interview list</button>
    
}