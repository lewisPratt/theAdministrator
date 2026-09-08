import { ChevronRightCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CommandInput() {
  const [typedCommand, setTypedCommand] = useState<string>("");
    const [errorState, setErrorState] = useState<string | null>(null)
  const navigate = useNavigate();

  function handleCommand(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    switch (typedCommand) {
      case "[DesStart]":
        navigate("/workDes");
         resetInput(e)
        break;
      case "[Voucher]":
        navigate("/VoucherShop");
        resetInput(e)
        break;
      case "[Review]":
        navigate("/TranscriptReview");
         resetInput(e)
        break;
      case "[Inbox]":
        navigate("/Inbox");
         resetInput(e)
        break;
      case "[LeaveReq]":
        // setLeaveReq(true);
        // setErrorState(false);
         resetInput(e)
        break;
      case "[Exit]":
        navigate("/CommandCentre");
         resetInput(e)
        break;
      default:
        resetInput(e)
        setErrorState("Command not recognized");
        break;
    }
  }

  function resetInput(e: React.SubmitEvent<HTMLFormElement>) {
    e.currentTarget.reset();
    setErrorState(null)
  }
  return (
    <div id="command-input-container">
        
      <form id="nav-form" onSubmit={handleCommand}>
        {errorState !=  null &&
            <p>{errorState}</p>
        }
        <input
          type="text"
          placeholder="[Command]"
          id="nav-text-input"
          name="command"
          autoComplete="off"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTypedCommand(e.currentTarget.value);
          }}
        ></input>
        <button id="nav-submit-button">
          <ChevronRightCircle size={20} />
        </button>
      </form>
    </div>
  );
}
