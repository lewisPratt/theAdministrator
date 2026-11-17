import CommandInput from "./CommandInput";
import NotLoggedIn from "./NotLoggedIn";
import ScoreTracker from "./ScoreTracker";
import SoundControl from "./SoundControl";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PlayerContext } from "../../context_providers/PlayerContext";
import { saveLocalData } from "../../utilities/helperFunctions";
import { Tooltip } from "react-tooltip";
export default function NavBar() {
  const [dataError] = useState<string | null>(null);
  const { playerData } = useContext(PlayerContext);

  const { pathname } = useLocation();

  {
    /* check to see if player is logged in or currently on a page where the nav should not be visible */
  }
  let componentEnabled: boolean = true;
  if (
    !sessionStorage.getItem("admin_game_status") ||
    pathname === "/" ||
    pathname === "/Goodbye" ||
    pathname === "/Welcome" ||
    pathname === "/HowToPlay"
  ) {
    componentEnabled = false;
  }

  //save playerdata when it changes
  useEffect(() => {
    if (playerData != null) {
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
                  <SoundControl />
                </div>
                <CommandInput />
                <ScoreTracker />
              </div>
            </>
          ) : (
            <NotLoggedIn soundControls={false} dataError={dataError} />
          )}
          <Tooltip id="nav-bar-tooltip" className="custom-tooltip"></Tooltip>
        </nav>
      )}
    </>
  );
}
