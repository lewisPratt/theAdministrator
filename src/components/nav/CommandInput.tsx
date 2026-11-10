import { ChevronRightCircle, CircleQuestionMark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React, { useState, useContext, useEffect, useRef } from "react";
import { CurrentSlugContext } from "../../context_providers/CurrentSlugContext";
import AvailableCommandsList from "./AvailableCommandsList";
import { ErrorContext } from "../../context_providers/ErrorContext";
import { TutorialContext } from "../../context_providers/TutorialContext";
import { PlayerContext } from "../../context_providers/PlayerContext";
import { playCustomSound, playKeyStroke } from "../../assets/utils/helpers";




export default function CommandInput() {
  const [showCommands, setShowCommands] = useState<boolean>(false);
  const { setCurrentSlug } = useContext(CurrentSlugContext);
  const { errorState,setErrorState } = useContext(ErrorContext);
  const { tutorialState } = useContext(TutorialContext);
  const {playerData, setPlayerData} = useContext(PlayerContext)
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null)

useEffect(()=>{
  if(!errorState){
    inputRef.current?.focus()
  }
},[errorState])

  function doLogout(){
    if(playerData) {
      sessionStorage.removeItem("admin_game_status")
      setPlayerData(null)
      
    }
}


  function handleCommand(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formValues = new FormData(e.target);
    const command = formValues.get("command")?.toString();
    if (command) {
      switch (command?.toLowerCase().trim()) {
        case "nav.upgrade":
          navigate("/UpgradeShop");
          setCurrentSlug("nav.voucher");
          resetInput(e);
          break;
        case "nav.review":
          navigate("/CaseReview");
          setCurrentSlug("nav.review");
          resetInput(e);
          break;
        case "nav.about":
          navigate("/About");
          setCurrentSlug("nav.about");
          resetInput(e);
          break;
        case "nav.inbox":
          navigate("/Inbox");
          setCurrentSlug("nav.inbox");
          resetInput(e);
          break;
        case "nav.terminal":
          navigate("/Terminal");
          setCurrentSlug("nav.terminal");
          resetInput(e);
          break;
        case "nav.logout":
          doLogout()
          navigate("/Goodbye");
          break;
        case "nav.personal":
          navigate("/PersonalRecord");
          resetInput(e);
          break;
        case "nav.stats":
          navigate("/Stats");
          break;
        default:
          resetInput(e);
          setErrorState("Command not recognized: " + command);
          playCustomSound("errorSound")
          break;
      }
    }
  }

  
  

  function resetInput(e: React.SubmitEvent<HTMLFormElement>) {
    e.currentTarget.reset();
  }
  function toggleCommands(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setShowCommands((prev) => !prev);
  }

  return (
    <div id="command-input-container">
      <form
        id="tutorial-step-5"
        className={
          (tutorialState.tutorialActive && tutorialState.tutorialStep === 5
            ? "tutorial-highlight"
            : "") + " nav-form"
        }
        onSubmit={handleCommand}
      >
        
        <input
          type="text"
          placeholder="nav.command"
          id="nav-text-input"
          name="command"
          autoComplete="off"
          ref={inputRef}
          onChange={() => {
            playKeyStroke();
          }}
        ></input>

        <button
        aria-label="Submit navigation command"
          id="nav-submit-button"
          type="submit"
          data-tooltip-id="nav-terminal-tooltip"
          data-tooltip-content="Submit Nav Command"
          onClick={()=>playCustomSound("buttonPress")}
        >
          <ChevronRightCircle size={20} />
        </button>
        <button
        aria-label="Show available commands"
          id="tutorial-step-6"
          className={
            (tutorialState.tutorialActive && tutorialState.tutorialStep === 6
              ? "tutorial-highlight"
              : "") + " available-commands-button"
          }
          onClick={(e)=>{toggleCommands(e);playCustomSound("buttonPress")}}
          data-tooltip-id="nav-bar-tooltip"
          data-tooltip-content="Nav Commands"
        >
          <CircleQuestionMark size={20} />
        </button>
        {showCommands && <AvailableCommandsList  doLogout={doLogout}/>}
      </form>
    </div>
  );
}
