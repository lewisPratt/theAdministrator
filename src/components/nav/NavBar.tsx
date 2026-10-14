import CommandInput from "./CommandInput";
import NotLoggedIn from "./NotLoggedIn";
import ScoreTracker from "./ScoreTracker";
import SoundControl from "./SoundControl";
import TutorialButton from "./TutorialButton";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PlayerContext } from "../../context_providers/PlayerContext";
import type { playerDataShape } from "../../interfaces/interfaces";
import { saveLocalData } from "../../assets/utils/helpers";
import { Tooltip } from "react-tooltip";
export default function NavBar() {
  const { playerData, setPlayerData } = useContext(PlayerContext);
  const { pathname } = useLocation();

  {
    /* check to see if the current route is the login, welcome or goodbye page, if so, disable component */
  }
  let componentEnabled: boolean = true;
  if ( !sessionStorage.getItem("admin_game_status") 
    // pathname === "/" ||
    // pathname === "/Goodbye" ||
    // pathname === "/Welcome" ||
    // pathname === "/HowToPlay" ||
    // pathname === "*"
  ) {
    componentEnabled = false;
  }

  useEffect(() => {
    if (playerData === null && componentEnabled) {
      const savedData = localStorage.getItem("The_Administrator_Game");
      if (savedData) {
        const storedPlayerData: playerDataShape = JSON.parse(savedData);
        setPlayerData(storedPlayerData);
      }
    } else if (playerData != null) {
      saveLocalData(playerData);
    }
  }, [playerData]);

  return (
    <>
      {componentEnabled && (
        <nav>
          {playerData ? (
            <>
              <div id="nav-bar-parent">
                <div
                  id="interactive-nav-el-container"
                  className="desktop-nav-element"
                >
                  <div className="desktop-nav-element ">
                    <SoundControl />
                    <TutorialButton />
                  </div>
                </div>
                <CommandInput />
                <div className="desktop-nav-element">
                  <ScoreTracker />
                </div>
                <div className="mobile-nav-elements">
                 <div className="nav-left-elements">
                    <SoundControl />
                    <TutorialButton />
                  </div>
                  <ScoreTracker />
                </div>
              </div>
            </>
          ) : (
            <NotLoggedIn soundControls />
          )}
          <Tooltip id="nav-bar-tooltip" className="custom-tooltip"></Tooltip>
        </nav>
      )}
    </>
  );
}
