import { X } from "lucide-react";
import { TutorialContext } from "../../context_providers/TutorialContext";
import { useContext } from "react";
import { PlayerContext } from "../../context_providers/PlayerContext";
import type { playerDataShape } from "../../interfaces/interfaces";
import { saveLocalData } from "../../assets/utils/helpers";

export default function TutorialEnd() {
  const { setTutorialState } = useContext(TutorialContext);
  const { playerData, setPlayerData } = useContext(PlayerContext);

  

  function endTutorial() {
    if(playerData){
    let dataToUpdate: playerDataShape = playerData;
    setTutorialState({ tutorialActive: false, tutorialStep: 0 });
    dataToUpdate.player_tutorialComplete = true;
    setPlayerData(dataToUpdate)
    saveLocalData(dataToUpdate)
    }
  }

  return (
    <div id="tutorial-end-container">
      <p>You finished the tutorial</p>
      <button aria-label="End tutorial" autoFocus onClick={endTutorial}>
        <X />
      </button>
    </div>
  );
}
