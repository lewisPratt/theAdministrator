import { TutorialContext } from "../../context_providers/TutorialContext"
import { useContext } from "react"

export default function TutorialStart(){

    const {setTutorialState} = useContext(TutorialContext)

    return (
        <div id="tutorial-start-container">
            <p>Would you like to complete a quick tutorial?</p>
            <button onClick={()=>setTutorialState({tutorialActive:true,tutorialStep:1})}>Yes</button>
            <button onClick={()=>setTutorialState({tutorialActive:false,tutorialStep:0})}>No</button>

        </div>
    )
}