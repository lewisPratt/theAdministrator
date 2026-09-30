import { TutorialContext } from "../../context_providers/TutorialContext"
import { useContext } from "react"


export default function TutorialButton(){
const {tutorialState, setTutorialState} = useContext(TutorialContext)

function toggleTutorialState(){
    if(tutorialState.tutorialActive){
        return false
    }else{
        return true
    }
}

    return(
         <button id="tutorial-toggle-button" onClick={()=>setTutorialState({tutorialActive: toggleTutorialState(),tutorialStep: 0})}>Tutorial</button>
    )
}