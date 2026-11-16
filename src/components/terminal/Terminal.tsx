import { useEffect, useState, useContext,} from "react";
import {ChevronRightCircle, LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CurrentSlugContext } from "../../context_providers/CurrentSlugContext";
import NotLoggedIn from "../nav/NotLoggedIn";
import { ErrorContext } from "../../context_providers/ErrorContext";
import { TutorialContext } from "../../context_providers/TutorialContext";
import "../../assets/css/Terminal.css";
import { useRef } from "react";
import { type TooltipRefProps } from "react-tooltip";

import TutorialLogic from "../tutorial/TutorialLogic";
import { PlayerContext } from "../../context_providers/PlayerContext";
import { playKeyStroke, playCustomSound, limitLength  } from "../../utilities/helperFunctions";

export default function CommandCentre() {
  const [loadingState, setLoadingState] = useState<boolean>(true);

  const { setCurrentSlug } = useContext(CurrentSlugContext);
  const {errorState, setErrorState } = useContext(ErrorContext);
  const { tutorialState } = useContext(TutorialContext);
  const { playerData, setPlayerData } = useContext(PlayerContext);
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null)

  const tooltipRef1 = useRef<TooltipRefProps>(null);

  //turn off loading indicator after set interval
  useEffect(() => {
    setTimeout(setLoadingState, 2000, false);
  }, []);


 function doLogout(){
    if(playerData) {
      sessionStorage.removeItem("admin_game_status")
      setPlayerData(null)
    }
}

useEffect(()=>{
  if(!errorState){
      inputRef.current?.focus()

  }
},[errorState])
  function handleCommand(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formValues = new FormData(e.target);
    const command = formValues.get("command")?.toString();
    if (command) {
      switch (command.toLowerCase().trim()) {
        case "nav.upgrade":
          navigate("/UpgradeShop");
          setCurrentSlug("nav.upgrade");
          break;
        case "nav.about":
          navigate("/About");
          setCurrentSlug("nav.about");
          break;
        case "nav.review":
          navigate("/CaseReview");
          setCurrentSlug("nav.review");
          break;
        case "request.leave":
          setErrorState("Due to ongoing union disputes, leave requests have been paused until: 21/09/2047");
          playCustomSound("errorSound")
          break;
        case "nav.logout":
          doLogout()
          navigate("/Goodbye");
          break;
        case "nav.personal":
          navigate("/PersonalRecord");
          setCurrentSlug("nav.personal");
          break;
        case "nav.terminal":
          navigate("/Terminal");
          break;
        default:
          setErrorState("Command not recognized: " + limitLength(command));
          playCustomSound("errorSound")
          e.currentTarget.reset();
          break;
      }
    }
  }


  return (
    <>
      <TutorialLogic loadingState={loadingState} tooltipRef={tooltipRef1} />

      {loadingState ? (
        <p>
          <LoaderCircle className="loader" />
        </p>
      ) : (
        <>
          <section id="welcome-section">
            {playerData && sessionStorage.getItem("admin_game_status")?  (
              <>
                <h1>Welcome Administrator</h1>
                <p>Please navigate to your required destination below.</p>
                <form
                  id="tutorial-step-1"
                  className={ "terminal-form " + (
                    tutorialState.tutorialActive &&
                    tutorialState.tutorialStep === 1
                      ? "tutorial-highlight"
                      : "")
                  }
                  onSubmit={handleCommand}
                  onChange={()=>playKeyStroke()}
                  method="post"
                >
                  <div id="command-centre-input-container">
                    <input
                      type="text"
                      placeholder="nav.command"
                      id="command-centre-input"
                      name="command"
                      autoComplete="off"
                      ref={inputRef}
                      autoFocus
             
                    />
                    <button onClick={()=>playCustomSound("buttonPress")} aria-label="Submit navigation command" id="command-centre-submit-button">
                      <ChevronRightCircle size={28} />
                    </button>
                  </div>
                </form>


                <div
                  id="tutorial-step-2"
                  className={
                    (tutorialState.tutorialActive &&
                    tutorialState.tutorialStep === 2
                      ? "tutorial-highlight"
                      : "") + " commands-container"
                  }
                >
                  <div id="commands-header">
                    <h2 className="commands-heading">Commands</h2>
                  </div>
                  <ol className="commands-list">
                    <li className="command-row">
                      <p>Review open cases</p>
                      <p>nav.review</p>
                    </li>
                    <li className="command-row">
                      <p>Personal Record</p> <p>nav.personal</p>
                    </li>
                    <li className="command-row">
                      <p>Upgrade Terminal</p> <p>nav.upgrade</p>
                    </li>
            
                    <li className="command-row">
                      <p>Request leave</p>
                      <p>request.leave</p>
                    </li>
                    <li className="command-row">
                      <p>About</p>
                      <p>nav.about</p>
                    </li>
             
                    <li className="command-row">
                      <p>Logout</p>
                      <p>nav.logout</p>
                    </li>
                  </ol>
                </div>
              </>
            ) : (
              <>
                <NotLoggedIn soundControls={false} dataError={errorState}/>
              </>
            )}
          </section>
          
        </>
      )}
    </>
  );
}
