import { CircleQuestionMark } from "lucide-react"
import { PlayerContext } from "../../context_providers/PlayerContext"
import { TutorialContext } from "../../context_providers/TutorialContext"
import { useContext } from "react"
import { playButtonPress } from "../../assets/utils/helpers"

export default function TutorialButton(){
const {tutorialState, setTutorialState} = useContext(TutorialContext)
const {playerData} = useContext(PlayerContext)
function toggleTutorialState(){
    if(tutorialState.tutorialActive){
        return false
    }else{
        return true
    }
}

function handleClick(){
    playButtonPress()
    setTutorialState({tutorialActive: toggleTutorialState(),tutorialStep: 0})
}
    return(
         <button aria-label="Open tutorial" data-tooltip-id="nav-bar-tooltip" data-tooltip-content="Tutorial" id="tutorial-toggle-button" onClick={handleClick}>{playerData?.player_tutorialComplete ? <CircleQuestionMark /> : "Tutorial"}</button>
         
    )
}