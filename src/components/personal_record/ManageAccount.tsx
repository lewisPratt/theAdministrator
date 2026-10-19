import { useContext, useState } from "react"
import { PlayerContext } from "../../context_providers/PlayerContext"
import { TutorialContext } from "../../context_providers/TutorialContext"
import { useNavigate } from "react-router-dom"



export default function ManageAccount(){
const {playerData, setPlayerData} = useContext(PlayerContext)
const {tutorialState} = useContext(TutorialContext)
// const {currentSlug, setCurrentSlug} = useContext(CurrentSlugContext)
const [confirm, setConfirm] = useState<boolean>(false)
const navigate = useNavigate()

function deleteData(){
    if(playerData) {
        sessionStorage.removeItem("admin_game_status")
        localStorage.removeItem("The_Administrator_Game")
        setPlayerData(null)
        navigate("/")
    }
}

    return (
         <section id="tutorial-step-18" className={(tutorialState.tutorialActive && tutorialState.tutorialStep === 18 ? "tutorial-highlight":"") +" manage-section"}>
                <h4>Manage</h4>
                {playerData &&
                 <p><button onClick={()=>setConfirm(prev =>!prev)} >Delete account</button></p>
                }
                {confirm && 
                    <>
                        <p>Are your sure you want to delete account saved data?</p>
                        <p>If yes, your game data will be deleted and you will be redirected to login</p>
                        <button onClick={()=>deleteData()}>yes</button> <button onClick={()=>setConfirm(false)}>cancel</button>
                    </>
                }
                
            </section>
    )
}