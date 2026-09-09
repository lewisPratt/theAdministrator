import { useEffect, useState, useContext } from "react";
import { ChevronRightCircle, LoaderCircle } from "lucide-react";
import LeaveReq from "./LeaveReq";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "./context_providers/AdminContext";
import { CurrentSlugContext } from "./context_providers/CurrentSlugContext";

export default function CommandCentre() {
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const [typedCommand, setTypedCommand] = useState<string>("");
  const [leaveReq, setLeaveReq] = useState<boolean>(false);
  const [errorState, setErrorState] = useState<boolean>(false);
  const { adminName, setAdminName } = useContext(AdminContext);
  const {currentSlug, setCurrentSlug} = useContext(CurrentSlugContext)
  const navigate = useNavigate();

  // const currentDate = Date.now()
  // const leaveDate = new Date(2047,1)
  // const difference = (leaveDate - currentDate)

  //turn off loading indicator after set interval
  useEffect(() => {
    setTimeout(setLoadingState, 2000, false);
  }, []);

  function handleCommand(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    switch (typedCommand) {
      case "nav.work":
        navigate("/workDes");
        setCurrentSlug("nav.work")
        break;
      case "nav.voucher":
        navigate("/VoucherShop");
        setCurrentSlug("nav.voucher")
        break;
      case "nav.review":
        navigate("/TranscriptReview");
        setCurrentSlug("nav.review")
        break;
      case "nav.inbox":
        navigate("/Inbox");
        setCurrentSlug("nav.inbox")
        break;
      case "request.leave":
        setLeaveReq(true);
        setErrorState(false);
        e.currentTarget.reset();
        break;
      case "nav.logout":
        setAdminName("")
        navigate("/");
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
            <div id="command-centre-input-container">
              <input
                autoFocus
                type="text"
                placeholder="nav.command"
                id="command-centre-input"
                name="command"
                autoComplete="off"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setTypedCommand(e.currentTarget.value);
                }}
              ></input>
              <button id="command-centre-submit-button"><ChevronRightCircle size={28}/></button>
              
            </div>
            
          </form>
          {leaveReq && <LeaveReq />}
          {errorState && <p>Command Not recognized.</p>}
          
          <div className="commands-container">
            <p>Nav Commands:</p>
            <div className="command-container">
              <p>Review interview transcripts.</p> <p>nav.review</p>
            </div>
            <div className="command-container">
              <p>Voucher Terminal</p> <p>nav.voucher</p>
            </div>
            <div className="command-container">
              <p>Inbox</p> <p>nav.inbox</p>
            </div>
            <div className="command-container">
              <p>Request leave.</p> <p>request.leave</p>
            </div>
            <div className="command-container">
              <p>Logout.</p> <p>nav.logout</p>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
