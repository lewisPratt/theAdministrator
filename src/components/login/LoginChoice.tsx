import { X } from "lucide-react";
import { useContext, type Dispatch, type SetStateAction } from "react";
import type { playerDataShape } from "../../interfaces/interfaces";
import { PlayerContext } from "../../context_providers/PlayerContext";
import { useNavigate } from "react-router-dom";

interface loginChoiceProps {
  loginChoiceData: loginChoiceShape;
  choiceSetter: Dispatch<SetStateAction<loginChoiceShape | null>>;
  setupNewPlayer: (enteredName: string) => void;
}
interface loginChoiceShape{
  enteredName: string
  retrievedSave: playerDataShape
}

export default function LoginChoice({
  loginChoiceData,choiceSetter,
  setupNewPlayer,
}: loginChoiceProps) {
  const navigate = useNavigate();
  const { setPlayerData } = useContext(PlayerContext);

  function continueGame() {
    setPlayerData(loginChoiceData.retrievedSave);
    navigate("/welcome");
  }


  return (
    <div id="login-choice-overlay">
      <div id="login-choice-container">
        <button
          id="login-choice-close-button"
          onClick={() => choiceSetter(null)}
        >
          {" "}
          <X size={14} />
        </button>
        <p>Save Data already exists for another playthrough.</p>
        <p>Administrator Name: [{loginChoiceData.retrievedSave.player_name}]</p>
        <p>Would you like to continue with saved data or start a new game?</p>
        <button autoFocus onClick={continueGame}>
          Continue
        </button>
        <button onClick={()=>setupNewPlayer(loginChoiceData.enteredName)}>New Game</button>
        <p id="login-choice-small-text">
          (Starting a new game will overwrite progress from the previous
          playthrough.)
        </p>
      </div>
    </div>
  );
}
