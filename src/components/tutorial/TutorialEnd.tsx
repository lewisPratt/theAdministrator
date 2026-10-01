import { X } from "lucide-react";
import { TutorialContext } from "../../context_providers/TutorialContext";
import { useContext } from "react";
import { PlayerContext } from "../../context_providers/PlayerContext";
import type { playerDataShape } from "../../interfaces/interfaces";
import { saveLocalData } from "../../assets/utils/helpers";

export default function TutorialEnd() {
  const { setTutorialState } = useContext(TutorialContext);
  const { playerData, setPlayerData } = useContext(PlayerContext);

  let dataToUpdate: playerDataShape = playerData;

  function endTutorial() {
    setTutorialState({ tutorialActive: false, tutorialStep: 0 });
    dataToUpdate.player_tutorialComplete = true;
    setPlayerData(dataToUpdate)
    saveLocalData(playerData)
  }

  return (
    <div id="tutorial-end-container">
      <p>You finished the tutorial</p>
      <button autoFocus onClick={endTutorial}>
        <X />
      </button>
    </div>
  );
}
