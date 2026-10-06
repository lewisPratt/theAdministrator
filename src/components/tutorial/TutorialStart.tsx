import { Check , X} from "lucide-react";
import { TutorialContext } from "../../context_providers/TutorialContext"
import { useContext } from "react"
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function TutorialStart(){
 const location = useLocation();
 const navigate = useNavigate()
  const { pathname } = location;
const {setTutorialState} = useContext(TutorialContext)


    function startTutorial(){
        if(pathname != "Terminal"){
            navigate("/Terminal")
        }
        setTutorialState({tutorialActive:true,tutorialStep:1})
    }
    return (
        <div id="tutorial-start-container">
            <p>Would you like to complete a quick tutorial?</p>
            <button aria-label="Start tutorial" autoFocus onClick={startTutorial}><Check /></button>
            <button aria-label="Cancel tutorial" onClick={()=>setTutorialState({tutorialActive:false,tutorialStep:0})}><X /></button>

        </div>
    )
}