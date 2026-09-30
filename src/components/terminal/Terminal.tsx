import { useEffect, useState, useContext } from "react";
import { Braces, ChevronRightCircle, Code, LoaderCircle } from "lucide-react";
import LeaveReq from "../LeaveReq";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../context_providers/AdminContext";
import { CurrentSlugContext } from "../../context_providers/CurrentSlugContext";
import NotLoggedIn from "../nav/NotLoggedIn";
import ActivityGraph from "./ActivityGraph";
import { ErrorContext } from "../../context_providers/ErrorContext";
import { TutorialContext } from "../../context_providers/TutorialContext";
import "../../assets/css/terminal.css";
import { useRef } from "react";
import { Tooltip, type TooltipRefProps } from "react-tooltip";
import TutorialOverlay from "../TutorialOverlay";
import TutorialSteps from "../tutorial/TutorialSteps";

export default function CommandCentre() {
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const [leaveReq, setLeaveReq] = useState<boolean>(false);

  const { adminName, setAdminName } = useContext(AdminContext);
  const { setCurrentSlug } = useContext(CurrentSlugContext);
  const { setErrorState } = useContext(ErrorContext);
  const { tutorialState, setTutorialState } = useContext(TutorialContext);
  const navigate = useNavigate();

  const tooltipRef1 = useRef<TooltipRefProps>(null);
  const tooltipRef2 = useRef<TooltipRefProps>(null);

  useEffect(() => {
    if (tutorialState.tutorialActive) {
      
        tooltipRef1.current?.open({
          anchorSelect: "#tutorial-step-"+tutorialState.tutorialStep,
          content: <TutorialSteps stepNumber={tutorialState.tutorialStep} />
        });
      
    }
  }, [tutorialState]);

  //turn off loading indicator after set interval
  useEffect(() => {
    setTimeout(setLoadingState, 2000, false);
  }, []);

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
        case "nav.hr":
          navigate("/HR");
          setCurrentSlug("nav.hr");
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
          setAdminName("");
          navigate("/Goodbye");
          break;
        case "nav.personal":
          navigate("/PersonalRecord");
          break;
        case "nav.terminal":
          navigate("/Terminal");
          break;
        default:
          setErrorState("Command not recognized: " + command);
          setLeaveReq(false);
          e.currentTarget.reset();
          break;
      }
    }
  }

  return (
    <>
      {loadingState ? (
        <p>
          <LoaderCircle className="loader" />
        </p>
      ) : (
        <>
        { tutorialState.tutorialActive &&  adminName && <TutorialOverlay />}
          <section id="welcome-section">
            {adminName ? (
              <>
                <h1>Welcome Administrator {adminName}.</h1>
                <form onSubmit={handleCommand} method="post">
                  <div id="command-typing-container">
                    
                  </div>
                  <div id="command-centre-input-container">
                    <a id="tutorial-step-2"></a>
                    <input
                      autoFocus
                      type="text"
                      placeholder="nav.command"
                      id="command-centre-input"
                      name="command"
                      autoComplete="off"
                      // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      //   setTypedCommand(e.currentTarget.value);
                      // }}
                    ></input>
                    <button id="command-centre-submit-button">
                      <ChevronRightCircle size={28} />
                    </button>
                    
                  </div>
                </form>

                {leaveReq && <LeaveReq />}

                <div className="commands-container">
                  <div id="commands-header">
                    <div>
                      <Code />
                    </div>{" "}
                    <div id="header-div">
                      <a id="tutorial-step-1"></a>
                      <p>Nav Commands:</p>
                      
                    </div>
                    <div>
                      <Braces />
                    </div>
                  </div>
                  <div className="command-container">
                    <p>Review interview transcripts.</p>
                    <div></div> <p>nav.review</p>
                  </div>
                  <div className="command-container">
                    <p>Voucher Terminal</p> <p>nav.voucher</p>
                  </div>
                  <div className="command-container">
                    <p>Inbox</p>  <p>nav.inbox</p>
                  </div>
                  <div className="command-container">
                    <p>Request leave.</p>
                     <p>request.leave</p>
                  </div>
                  <div className="command-container">
                    <p>Human Resources</p>
                     <p>nav.hr</p>
                  </div>
                  <div className="command-container">
                    <p>Logout.</p>
                    <p>nav.logout</p>
                  </div>
                </div>
                <Tooltip className="custom-tooltip" ref={tooltipRef1} imperativeModeOnly clickable/>
              </>
            ) : (
              <>
                <NotLoggedIn soundControls={false} />
              </>
            )}
          </section>
          <section id="city-stats-section"></section>
          <section>
            <ActivityGraph />
          </section>
        </>
      )}
    </>
  );
}
