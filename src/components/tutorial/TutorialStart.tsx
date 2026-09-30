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
            <button onClick={startTutorial}>Yes</button>
            <button onClick={()=>setTutorialState({tutorialActive:false,tutorialStep:0})}>No</button>

        </div>
    )
}