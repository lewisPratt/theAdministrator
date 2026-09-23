import { X } from "lucide-react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentSlugContext } from "./context_providers/CurrentSlugContext";
import type{ newMessageProps } from "./interfaces/interfaces";

export default function NewMessage({ messageStateSetter }: newMessageProps) {
  const [entered, setEntered] = useState<boolean>(false);
  const [closing, setClosing] = useState<boolean>(false);
    const {setCurrentSlug} = useContext(CurrentSlugContext)
  
  const navigate = useNavigate();

  //handle the notification state dependant on which animation has just ended
  function handleAnimationEnd(e: React.AnimationEvent<HTMLDivElement>) {
    if (e.animationName == "opacity-slide-in") {
      setEntered(true);
  

    } else if (e.animationName == "slide-out") {
      messageStateSetter(false);
    }
  }

  //trigger closing notification animation class to be applied
  function closeMessageNotification() {
    setClosing(true);
  }

  function visitInbox(){
    setEntered(true);
    setClosing(true)
    setCurrentSlug("nav.inbox")
     navigate("/Inbox")
  }

  return (
    <div
      id="new-message-container"
     
      onAnimationEnd={(e) => {
        handleAnimationEnd(e);
      }}
      className={
        (!entered ? "new-message-entrance" : "") +
        (closing ? "new-message-exit" : "") +
        (entered && !closing ? " new-message-float" : "")
      }
    >
      <div id="close-new-message-header" >
        <button id='close-notification-button' onClick={closeMessageNotification}><X size={15} /></button>
      </div>
          <h4>New Message</h4>
          <p>Welcome to your new role.</p>
        <button  onClick={visitInbox}>Read Message</button>
 
    </div>
  );
}
