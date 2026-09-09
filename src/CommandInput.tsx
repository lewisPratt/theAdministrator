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
      case "nav.work":
        navigate("/workDes");
         resetInput(e)
        break;
      case "nav.voucher":
        navigate("/VoucherShop");
        resetInput(e)
        break;
      case "nav.review":
        navigate("/TranscriptReview");
         resetInput(e)
        break;
      case "nav.inbox":
        navigate("/Inbox");
         resetInput(e)
        break;
      case "nav.exit":
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
          placeholder="nav.command"
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
