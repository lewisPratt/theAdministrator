import { CreditIcon } from "../../assets/custom_icons/credits";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CurrentSlugContext } from "../../context_providers/CurrentSlugContext";
import { TutorialContext } from "../../context_providers/TutorialContext";
import { PlayerContext } from "../../context_providers/PlayerContext";

export default function ScoreTracker() {
  const { setCurrentSlug } = useContext(CurrentSlugContext);
  const { playerData } = useContext(PlayerContext);
  const navigate = useNavigate();
  const { tutorialState } = useContext(TutorialContext);

  return (
    <>
      <button
        id="tutorial-step-12"
        onClick={() => {
          navigate("/UpgradeShop");
          setCurrentSlug("nav.upgrade");
        }}
        className={
          (tutorialState.tutorialActive && tutorialState.tutorialStep === 12
            ? "tutorial-highlight"
            : "") + " score-tracker-button"
        }
        tabIndex={0}
        data-tooltip-id="nav-bar-tooltip"
        data-tooltip-content="Credits can be used in the Upgrade Terminal."
      >
        <CreditIcon size={18} className="custom-icon" />{" "}
        {playerData?.player_credits}
      </button>
    </>
  );
}
