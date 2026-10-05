import { useContext } from "react"
import { PlayerContext } from "../../context_providers/PlayerContext"
import { TutorialContext } from "../../context_providers/TutorialContext"
import { CreditIcon } from "../../assets/custom_icons/credits"


export default function PlayerStats(){
const {playerData} = useContext(PlayerContext)
const {tutorialState} = useContext(TutorialContext)

    return (
    <section id="tutorial-step-16" className={(tutorialState.tutorialActive && tutorialState.tutorialStep === 16 ? "tutorial-highlight":"") +" stats-section"}>
        <h3>Statistics</h3>
        {playerData &&
         Object.entries(playerData?.player_stats).map((stat)=>{
            return <p>{stat[0]} : {stat[0] == "total_credits_earned" && <CreditIcon size={12}/>}{stat[1]}</p>
        })}
        <p>success/fail_ratio: {playerData && !isNaN(playerData?.player_stats.cases_correct / playerData?.player_stats.cases_failed) ?
           (playerData?.player_stats.cases_correct / playerData?.player_stats.cases_failed).toFixed(2) : "No data" }</p>
    </section>
    )
    
}