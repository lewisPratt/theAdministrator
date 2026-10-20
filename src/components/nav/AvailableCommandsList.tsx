import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { CurrentSlugContext } from "../../context_providers/CurrentSlugContext"

interface commandsListProps{
    doLogout : () => void
}

export default function AvailableCommandsList({doLogout}: commandsListProps){
    
    const navigate = useNavigate()
    const {setCurrentSlug} = useContext(CurrentSlugContext)

    function navigateTo(where: string){
        navigate("/"+where)
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

    return(
        <div id='commands-list-container'>
            <ol>
                <li><button onClick={()=>navigateTo("Terminal")}>{">"} nav.terminal</button></li>
                <li><button onClick={()=>navigateTo("CaseReview")}>{">"} nav.review</button></li>
                <li><button onClick={()=>navigateTo("UpgradeShop")}>{">"} nav.upgrade</button></li>
                <li><button onClick={()=>navigateTo("PersonalRecord")}>{">"} nav.personal</button></li>
                <li><button onClick={()=>navigateTo("About")}>{">"} nav.about</button></li>
                <li><button onClick={()=>triggerLogout()}>{">"} nav.logout</button></li>
                
            </ol>
        </div>
    )
}