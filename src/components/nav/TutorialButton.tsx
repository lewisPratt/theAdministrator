import { TutorialContext } from "../../context_providers/TutorialContext"
import { useContext } from "react"


export default function TutorialButton(){
const {setTutorialState} = useContext(TutorialContext)
    return(
        <button id="tutorial-toggle-button" onClick={()=>setTutorialState(prev=>!prev)}>Tutorial</button>
    )
}