import { useContext } from "react";
import { TutorialContext } from "../../context_providers/TutorialContext";
import { getUnlockDetails } from "../../assets/utils/helpers";
import { PlayerContext } from "../../context_providers/PlayerContext";
import { Badge } from "lucide-react";

/**
 * 
 * @returns shows the players active upgrades formatted into a terminal style div container
 */
export default function ActiveUpgrades() {
  const { tutorialState } = useContext(TutorialContext);
  const { playerData } = useContext(PlayerContext);
  const upgradeDetails = getUnlockDetails(playerData);

  return (
    <div className="active-upgrades-container">
      <h6
        id="tutorial-step-8"
        className={
          tutorialState.tutorialActive && tutorialState.tutorialStep === 8
            ? "tutorial-highlight"
            : ""
        }
      >
        Active Upgrades
      </h6>
      {upgradeDetails &&
        upgradeDetails.map((unlock) => {
          return (
            <Badge
            key={unlock.name+unlock.cost}
              size="25"
              data-tooltip-id="extra-case-tooltip"
              data-tooltip-content={unlock.perkEffect}
            >
              {unlock.icon}
            </Badge>
          );
        })}
    </div>
  );
}
