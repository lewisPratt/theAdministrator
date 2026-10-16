import { useContext } from "react"
import { PlayerContext } from "../../context_providers/PlayerContext"
import { TutorialContext } from "../../context_providers/TutorialContext"
import { promotionPrefixes } from "../../generator_modules/titles"

export default function TitleUnlocks(){
const {playerData} = useContext(PlayerContext)
const {tutorialState} = useContext(TutorialContext)

    return (
          <section id="tutorial-step-17" className={(tutorialState.tutorialActive && tutorialState.tutorialStep === 17 ? "tutorial-highlight":"") +" title-unlocks-section"}>
        <h3>Promotion Titles Unlocked</h3>
            <ol>
            {promotionPrefixes.map((title)=>{
                if(playerData?.player_titles.includes(title)){
                return <li>{title}</li>}
                else{
                   return  <li> ?????? </li>
                }
            })}
            </ol>
        
        </section>
    )
}