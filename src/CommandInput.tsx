import {  ChevronRightCircle,  CircleQuestionMark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React, {
  useState,
  useContext,
} from "react";
import { CurrentSlugContext } from "./context_providers/CurrentSlugContext";
import AvailableCommandsList from "./AvailableCommandsList";
import { Tooltip } from "react-tooltip";
import { playSound } from "react-sounds";
import type{ CommandInputProps } from "./interfaces/interfaces";

export default function CommandInput({ adminNameSetter }: CommandInputProps) {
  const [typedCommand, setTypedCommand] = useState<string>("");
  const [errorState, setErrorState] = useState<string | null>(null);
  const [showCommands, setShowCommands] = useState<boolean>(false);
  const {setCurrentSlug } = useContext(CurrentSlugContext);
    
  const navigate = useNavigate();

  function handleCommand(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    switch (typedCommand) {
      case "nav.work":
        navigate("/workDes");
        setCurrentSlug("nav.work");
        resetInput(e);
        break;
      case "nav.voucher":
        navigate("/VoucherShop");
        setCurrentSlug("nav.voucher");
        resetInput(e);
        break;
      case "nav.review":
        navigate("/TranscriptReview");
        setCurrentSlug("nav.review");
        resetInput(e);
        break;
      case "nav.inbox":
        navigate("/Inbox");
        setCurrentSlug("nav.inbox");
        resetInput(e);
        break;
      case "nav.terminal":
        navigate("/CommandCentre");
        setCurrentSlug("nav.terminal");
        resetInput(e);
        break;
      case "nav.logout":
        adminNameSetter("");
        navigate("/Goodbye");
        break;
      default:
        resetInput(e);
        setErrorState("Command not recognized");
        break;
    }
  }

  function playKeyStroke(){
    const keystrokes = ['ui/keystroke_soft', 'ui/keystroke_medium', 'ui/keystroke_hard']
    const strokeSound = Math.floor(Math.random() * keystrokes.length) 
    console.log(strokeSound)
    const playStroke = playSound(keystrokes[strokeSound])
    playStroke
  }

  function resetInput(e: React.SubmitEvent<HTMLFormElement>) {
    e.currentTarget.reset();
    setErrorState(null);
  }
  function toggleCommands(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setShowCommands((prev) => !prev);
  }

  return (
    <div id="command-input-container">
      <form id="nav-form" onSubmit={handleCommand}>
        {errorState != null && <p className='error-text'>{errorState}</p>}
        <input
          type="text"
          placeholder="nav.command"
          id="nav-text-input"
          name="command"
          autoComplete="off"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTypedCommand(e.currentTarget.value);
            playKeyStroke()
          }}
        ></input>
        <button id="nav-submit-button" type="submit" data-tooltip-id='nav-terminal-tooltip' data-tooltip-content='Submit Nav Command'>
          <ChevronRightCircle size={20} />
        </button>
        <button id='available-commands-button' onClick={toggleCommands} data-tooltip-id='nav-terminal-tooltip' data-tooltip-content='Nav Commands'><CircleQuestionMark size={20}  /></button>
        {showCommands && <AvailableCommandsList />}
        < Tooltip id='nav-terminal-tooltip' className='custom-tooltip'></Tooltip>
      </form>
    </div>
  );
}
