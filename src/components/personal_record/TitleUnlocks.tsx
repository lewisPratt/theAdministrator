import { useContext } from "react"
import { PlayerContext } from "../../context_providers/PlayerContext"
import { TutorialContext } from "../../context_providers/TutorialContext"
import { promotionPrefixes } from "../../generator_modules/titles"
import type { playerDataShape } from "../../interfaces/interfaces"

export default function TitleUnlocks(){
const {playerData, setPlayerData} = useContext(PlayerContext)
const {tutorialState} = useContext(TutorialContext)


    function setTitle(title: string){
        if(playerData){
            let dataToUpdate :playerDataShape= {...playerData}
            dataToUpdate.player_title = title
            setPlayerData(dataToUpdate)
        }
    }
    return (
          <section id="tutorial-step-17" className={(tutorialState.tutorialActive && tutorialState.tutorialStep === 17 ? "tutorial-highlight":"") +" title-unlocks-section"}>
        <h3>Promotion Titles Unlocked</h3>
        <p>Select an unlocked title to set it as your current title.</p>
            <ol>
            {promotionPrefixes.map((title)=>{
                if(playerData?.player_titles.includes(title)){
                return <li><button className="title-set-button" onClick={()=>setTitle(title)} >{title}</button></li>}
                else{
                   return  <li> ?????? </li>
                }
            })}
            </ol>
        
        </section>
    )
}