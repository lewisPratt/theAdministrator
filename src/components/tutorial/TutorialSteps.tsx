import { X } from "lucide-react"
import { TutorialContext } from "../../context_providers/TutorialContext"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"

interface tutorialStepsProps{
    stepNumber: number
}

export default function TutorialSteps({stepNumber}:tutorialStepsProps){
    const {tutorialState, setTutorialState} = useContext(TutorialContext)
    const navigate = useNavigate()
    let textContent : string = ""
    switch (stepNumber) {
        case 1:
            textContent = "Use these commands to navigate around the system."
            break;
         case 2:
            textContent = "Type commands here to move between screens."
            break;
         case 3:
            textContent = "See where you currently are in the system."
            break;
        case 4:
            textContent = "Toggle system sounds on/off"
            break;
        case 5:
            textContent = "Navigate on any screen by typing commands here."
            break;
        case 6:
            textContent = "Check available commands."
            break;
        case 7:
            textContent = "Buy upgrades to improve your performance."
            break;
        default:
            break;
    }

    function previousStep(){
        let step : number = 0
        if(tutorialState.tutorialStep <= 1){
            setTutorialState({tutorialActive:false, tutorialStep:0})
            console.log("close tutorial")
        }else{
            step = tutorialState.tutorialStep - 1
            setTutorialState({tutorialActive: true, tutorialStep: step})
        }
        

    }

    function nextStep(){
        if((tutorialState.tutorialStep +1) === 7){ 
            navigate("/UpgradeShop")
        }
            setTutorialState({tutorialActive: true, tutorialStep: tutorialState.tutorialStep +1})
        
    }

    return(
       <> <div className="x-container"><button onClick={()=>setTutorialState({tutorialActive:false, tutorialStep:0})} className="tutorial-close-x"><X size={16} /></button> </div>{textContent} <p className="tutorial-button-container"><button className="tutorial-button" onClick={previousStep}>{tutorialState.tutorialStep <= 1 ? "Close" : "Previous"}</button><button className="tutorial-button" onClick={nextStep}>Next</button></p></>
    )
}