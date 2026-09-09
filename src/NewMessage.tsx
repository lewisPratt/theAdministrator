import { X } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
interface newMessageProps {
  messageStateSetter: Dispatch<SetStateAction<boolean>>;
}
export default function NewMessage({ messageStateSetter }: newMessageProps) {
  const [entered, setEntered] = useState<boolean>(false);
  const [closing, setClosing] = useState<boolean>(false);
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
    setClosing(true)
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
        (closing ? "new-message-exit" : "")
      }
    >
      <div id="close-new-message" onClick={closeMessageNotification}>
        <X size={15} />
      </div>
      <div onClick={visitInbox}id="notification-text-container">
        <p>New Message: Welcome to your new role!</p>
        <p>Your duties have been upgraded and now include the rev....</p>
      </div>
    </div>
  );
}
