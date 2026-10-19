import { useEffect, useState, useContext } from "react";
import {ChevronRightCircle, LoaderCircle } from "lucide-react";
import LeaveReq from "../LeaveReq";
import { useNavigate } from "react-router-dom";
import { CurrentSlugContext } from "../../context_providers/CurrentSlugContext";
import NotLoggedIn from "../nav/NotLoggedIn";
import { ErrorContext } from "../../context_providers/ErrorContext";
import { TutorialContext } from "../../context_providers/TutorialContext";
import "../../assets/css/terminal.css";
import { useRef } from "react";
import { type TooltipRefProps } from "react-tooltip";

import TutorialLogic from "../tutorial/TutorialLogic";
import { PlayerContext } from "../../context_providers/PlayerContext";

export default function CommandCentre() {
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const [leaveReq, setLeaveReq] = useState<boolean>(false);

  const { setCurrentSlug } = useContext(CurrentSlugContext);
  const { setErrorState } = useContext(ErrorContext);
  const { tutorialState } = useContext(TutorialContext);
  const { playerData, setPlayerData } = useContext(PlayerContext);
  const navigate = useNavigate();

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

  function handleCommand(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formValues = new FormData(e.target);
    const command = formValues.get("command")?.toString();
    if (command) {
      switch (command.toLowerCase()) {
        case "nav.upgrade":
          navigate("/UpgradeShop");
          setCurrentSlug("nav.voucher");
          break;
        case "nav.about":
          navigate("/About");
          setCurrentSlug("nav.about");
          break;
        case "nav.review":
          navigate("/CaseReview");
          setCurrentSlug("nav.review");
          break;
        case "nav.inbox":
          navigate("/Inbox");
          setCurrentSlug("nav.inbox");
          break;
        case "request.leave":
          setLeaveReq(true);
          e.currentTarget.reset();
          break;
        case "nav.logout":
          doLogout()
          navigate("/Goodbye");
          break;
        case "nav.personal":
          navigate("/PersonalRecord");
          break;
        case "nav.terminal":
          navigate("/Terminal");
          break;
        case "nav.stats":
          navigate("/Stats");
          break;
        default:
          setErrorState("Command not recognized: " + command);
          setLeaveReq(false);
          e.currentTarget.reset();
          break;
      }
    }
  }
  console.log(playerData);

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
                <h1>Welcome Administrator.</h1>
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
                  method="post"
                >
                  <div id="command-centre-input-container">
                    <input
                      type="text"
                      placeholder="nav.command"
                      id="command-centre-input"
                      name="command"
                      autoComplete="off"
             
                    ></input>
                    <button aria-label="Submit navigation command" id="command-centre-submit-button">
                      <ChevronRightCircle size={28} />
                    </button>
                  </div>
                </form>

                {leaveReq && <LeaveReq />}

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
                <NotLoggedIn soundControls={false} />
              </>
            )}
          </section>
          
        </>
      )}
    </>
  );
}
