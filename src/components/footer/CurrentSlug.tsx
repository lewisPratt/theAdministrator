import { useContext } from "react"
import type { CurrentSlugProps } from "../../interfaces/interfaces"
import { TutorialContext } from "../../context_providers/TutorialContext"
import { PlayerContext } from "../../context_providers/PlayerContext"

export default function CurrentSlug({pageName}: CurrentSlugProps){
    
const {tutorialState} = useContext(TutorialContext)
    const {playerData } =useContext(PlayerContext)
    return (
        <>
        {playerData != null &&
        <div id="tutorial-step-3" className={(tutorialState.tutorialActive && tutorialState.tutorialStep === 3 ? "tutorial-highlight":"")}><p>{pageName}</p></div>
        }
        </>
    )

}