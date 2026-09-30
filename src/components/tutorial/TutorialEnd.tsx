import { X} from "lucide-react";
import { TutorialContext } from "../../context_providers/TutorialContext"
import { useContext } from "react"

export default function TutorialEnd(){

const {setTutorialState} = useContext(TutorialContext)


   
   return(
     <div id="tutorial-end-container">
            <p>You finished the tutorial</p>
            <button
              autoFocus
              onClick={() =>
                setTutorialState({ tutorialActive: false, tutorialStep: 0 })
              }
            >
              <X />
            </button>
          </div>
   )
}