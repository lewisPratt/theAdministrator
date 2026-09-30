import TutorialStart from "./tutorial/TutorialStart";
import { TutorialContext } from "../context_providers/TutorialContext";
import { useContext } from "react";

export default function TutorialOverlay() {
  const { tutorialState } = useContext(TutorialContext);

  return (
    <>
      <div id="tutorial-overlay">
        {tutorialState.tutorialActive && tutorialState.tutorialStep === 0 && (
          <TutorialStart />
        )}
      </div>
    </>
  );
}
