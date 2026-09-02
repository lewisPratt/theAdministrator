import { useEffect, useState , useContext} from "react";
import { LoaderCircle } from "lucide-react";
import LeaveReq from "./LeaveReq";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "./context_providers/AdminContext";

export default function CommandCentre() {
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const [typedCommand, setTypedCommand] = useState<string>("");
  const [leaveReq, setLeaveReq] = useState<boolean>(false);
  const [errorState, setErrorState] = useState<boolean>(false);
  const {adminName, setAdminName} = useContext(AdminContext)
 
const navigate = useNavigate();

//turn off loading indicator after set interval
useEffect(() => {
  setTimeout(setLoadingState, 2000, false);
}, []);


  function handleCommand(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    switch (typedCommand) {
      case "[DesStart]":
        navigate("/workDes")
        break;
      case "[Review]":
        navigate("/TranscriptReview")
        break;
      case "[LeaveReq]":
        setLeaveReq(true);
        setErrorState(false);
        e.currentTarget.reset();
        break;
      case "[Exit]":
        navigate('/')
        break;
      default:
        setErrorState(true);
        setLeaveReq(false);
        e.currentTarget.reset();
        break;
    }
  }

  return (
    <>
      {loadingState ? (
        <p>
          <LoaderCircle className="loader" />
        </p>
      ) : (
        <section id="welcome-section">
          <h1>Welcome Administrator {adminName}.</h1>
          <form onSubmit={handleCommand}>
            <div id="command-typing-container">
              <label htmlFor="admin-name" id="welcome-message">
                What would you like to do today?
              </label>
            </div>
            <div id="command-input-container">
              <input
                autoFocus
                type="text"
                placeholder="[Command]"
                id="comsec-command"
                name="command"
                autoComplete="off"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setTypedCommand(e.currentTarget.value);
                }}
              ></input>
              <button id="login-submit-button">@</button>
            </div>
          </form>
          {leaveReq && <LeaveReq />}
          {errorState && <p>Command Not recognized.</p>}
          <p>Available commands:</p>
          <div className="commands-container">
            <div className="command-container">
              <p>Start work designation.</p> <p>[DesStart]</p>
            </div>
            <div className="command-container">
              <p>Review interview transcripts.</p> <p>[Review]</p>
            </div>
            <div className="command-container">
              <p>Request leave.</p> <p>[LeaveReq]</p>
            </div>
            <div className="command-container">
              <p>Exit.</p> <p>[Exit]</p>
            </div>
            <div className="command-container">
              <p>Available Commands.</p> <p>[Help]</p>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
