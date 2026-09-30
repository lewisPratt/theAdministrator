import { TutorialContext } from "../../context_providers/TutorialContext"
import { useContext } from "react"
interface tutorialStepsProps{
    stepNumber: number
}

export default function TutorialSteps({stepNumber}:tutorialStepsProps){
    const {tutorialState, setTutorialState} = useContext(TutorialContext)
    let textContent : string = ""
    switch (stepNumber) {
        case 1:
            textContent = "Use these commands to navigate around the system."
            break;
         case 2:
            textContent = "Type commands here to move between screens."
            break;
        default:
            break;
    }


    return(
       <> {textContent} <p><button onClick={()=>{setTutorialState({tutorialActive: true, tutorialStep: tutorialState.tutorialStep +1})}}>Next</button></p></>
    )
}