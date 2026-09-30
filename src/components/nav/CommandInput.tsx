import { ChevronRightCircle, CircleQuestionMark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { CurrentSlugContext } from "../../context_providers/CurrentSlugContext";
import AvailableCommandsList from "./AvailableCommandsList";
import { Tooltip } from "react-tooltip";
import { playSound } from "react-sounds";
import type { CommandInputProps } from "../../interfaces/interfaces";
import { ErrorContext } from "../../context_providers/ErrorContext";

export default function CommandInput({ adminNameSetter }: CommandInputProps) {
  const [showCommands, setShowCommands] = useState<boolean>(false);
  const { setCurrentSlug } = useContext(CurrentSlugContext);
  const {setErrorState} = useContext(ErrorContext)

  const navigate = useNavigate();

  function handleCommand(e: React.SubmitEvent<HTMLFormElement>) {
     e.preventDefault();
    const formValues = new FormData(e.target)
    const command = formValues.get('command')?.toString()

    switch (command?.toLowerCase()) {
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
        adminNameSetter("");
        navigate("/Goodbye");
        break;
      case "nav.personal":
        navigate("/PersonalRecord");
        resetInput(e);
        break;
      default:
        resetInput(e);
        setErrorState("Command not recognized: "+command);
        break;
    }
  }

  function playKeyStroke() {
    const keystrokes = [
      "ui/keystroke_soft",
      "ui/keystroke_medium",
      "ui/keystroke_hard",
    ];
    const strokeSound = Math.floor(Math.random() * keystrokes.length);
    console.log(strokeSound);
    const playStroke = playSound(keystrokes[strokeSound]);
    playStroke;
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
      <form id="nav-form" onSubmit={handleCommand}>
         <a id="tutorial-step-5"></a>
        <input
          type="text"
          placeholder="nav.command"
          id="nav-text-input"
          name="command"
          autoComplete="off"
          onChange={() => {
            playKeyStroke();
          }}
        ></input>
       
        <button
          id="nav-submit-button"
          type="submit"
          data-tooltip-id="nav-terminal-tooltip"
          data-tooltip-content="Submit Nav Command"
        >
          <ChevronRightCircle size={20} />
        </button>
        <button
          id="available-commands-button"
          onClick={toggleCommands}
          data-tooltip-id="nav-terminal-tooltip"
          data-tooltip-content="Nav Commands"
        >
          <a id="tutorial-step-6"></a>
          <CircleQuestionMark size={20} />
        </button>
        {showCommands && <AvailableCommandsList />}
        <Tooltip id="nav-terminal-tooltip" className="custom-tooltip"></Tooltip>
      </form>
    </div>
  );
}
