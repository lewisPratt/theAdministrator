import { useContext, type Dispatch, type SetStateAction } from "react"
import { useNavigate } from "react-router-dom"
import { CurrentSlugContext } from "../../context_providers/CurrentSlugContext"
import { playCustomSound } from "../../utilities/helperFunctions"
import { TutorialContext } from "../../context_providers/TutorialContext"

interface commandsListProps{
    doLogout : () => void
    availableCommandsSetter : Dispatch<SetStateAction<boolean>>
}

export default function AvailableCommandsList({doLogout, availableCommandsSetter}: commandsListProps){
    
    const navigate = useNavigate()
    const {setCurrentSlug} = useContext(CurrentSlugContext)
    const {tutorialState,setTutorialState} = useContext(TutorialContext)

     

    function navigateTo(where: string){
        navigate("/"+where)
        availableCommandsSetter(prev=>!prev)
        switch (where) {
            case "Terminal":
                setCurrentSlug("nav.terminal")
                break;
            case "CaseReview":
                setCurrentSlug("nav.review")
                break;
            case "UpgradeShop":
                setCurrentSlug("nav.upgrade")
                break;
            case "PersonalRecord":
                setCurrentSlug("nav.personal")
                break;
            case "About":
                setCurrentSlug("nav.about")
                break;
            default:
                break;
        }
    }

    function triggerLogout(){
        navigateTo("/goodbye")
        doLogout()
    }
    function toggleTutorialState(){
        availableCommandsSetter(prev=>!prev)
        if(tutorialState.tutorialActive){
            return false
        }else{
            return true
        }
    }
    function handleClick(){
        playCustomSound("buttonPress")
        setTutorialState({tutorialActive: toggleTutorialState(),tutorialStep: 0})
    }


    
    return(
        <div id='commands-list-container'>
            <ol>
                <li><button onClick={()=>navigateTo("Terminal")}>{">"} nav.terminal</button></li>
                <li><button onClick={()=>navigateTo("CaseReview")}>{">"} nav.review</button></li>
                <li><button onClick={()=>navigateTo("UpgradeShop")}>{">"} nav.upgrade</button></li>
                <li><button onClick={()=>navigateTo("PersonalRecord")}>{">"} nav.personal</button></li>
                <li><button onClick={()=>navigateTo("About")}>{">"} nav.about</button></li>
                <li><button onClick={()=>triggerLogout()}>{">"} nav.logout</button></li>
                <li><button onClick={()=>handleClick()}>{"? "} Tutorial</button></li>

                
            </ol>
        </div>
    )
}