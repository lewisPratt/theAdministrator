import { useContext, useEffect, type RefObject } from "react";
import { TutorialContext } from "../../context_providers/TutorialContext";
import TutorialSteps from "./TutorialSteps";
import { createPortal } from "react-dom";
import { Tooltip } from "react-tooltip";
import type { TooltipRefProps } from "react-tooltip";

interface tutorialLogicProps{
  loadingState : boolean
  tooltipRef: RefObject<TooltipRefProps | null>
}

export default function TutorialLogic({loadingState ,tooltipRef}:tutorialLogicProps  ){
  const tooltipRef1 = tooltipRef
  const {tutorialState,setTutorialState} = useContext(TutorialContext)
  
  document.addEventListener("keydown", (event)=>{
        if(event.key === "Escape" && tutorialState){
          setTutorialState({tutorialActive: false, tutorialStep: 0})
        }
      })
  
    //manage tutorial activation and progression through steps as well as closure when tutorial is deactivated.
  //runs on state change and when component has finished it faux load
  //tutorial state change = triggers move to next tutorial step and display tooltip in same component
  //load state change = triggers when tutorial moves player to next route to continue tutorial.
  useEffect(() => {
    if (tutorialState.tutorialActive) {
        tooltipRef1.current?.open({
          anchorSelect: "#tutorial-step-"+tutorialState.tutorialStep,
          content: <TutorialSteps stepNumber={tutorialState.tutorialStep} />
        }); 
    }
    //closes open tutorial tooltip when tutorial is turned off. 
    if(!tutorialState.tutorialActive){
      tooltipRef1.current?.close()
    }
    //traps tab focus to tutorial elements when tutorial is active. applies inert attribute to root
    //tutorial elements (overlay, tooltips) are placed outside of root element with the use of createPortal()
    //only implemented on terminal page so far.
     const root = document.getElementById('root');
     if(root){
     root.inert = tutorialState.tutorialActive;
     return () => { root.inert = false };
     }
  }, [tutorialState, loadingState]);


    return (createPortal( <Tooltip className="custom-tooltip" ref={tooltipRef1} imperativeModeOnly clickable/>, document.body))
    
}