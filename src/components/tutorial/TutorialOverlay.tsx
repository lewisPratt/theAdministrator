import TutorialStart from "./TutorialStart";
import { TutorialContext } from "../../context_providers/TutorialContext";
import { useContext } from "react";
import TutorialEnd from "./TutorialEnd";
export default function TutorialOverlay() {
  const { tutorialState } = useContext(TutorialContext);

  return (
    <>
      <div id="tutorial-overlay">
        {tutorialState.tutorialActive && tutorialState.tutorialStep === 0 && (
          <TutorialStart />
        )}
        {tutorialState.tutorialActive && tutorialState.tutorialStep === 19 && (
         <TutorialEnd />
        )}
      </div>
    </>
  );
}
