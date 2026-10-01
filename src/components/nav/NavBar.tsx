import MobileMenu from "../MobileMenu";
import CommandInput from "./CommandInput";
import NotLoggedIn from "./NotLoggedIn";
import ScoreTracker from "./ScoreTracker";
import SoundControl from "./SoundControl";
import TutorialButton from "./TutorialButton";

import { AdminContext } from "../../context_providers/AdminContext";
import { ScoreContext } from "../../context_providers/ScoreContext";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PlayerContext } from "../../context_providers/PlayerContext";
import type { playerDataShape } from "../../interfaces/interfaces";
import { saveLocalData } from "../../assets/utils/helpers";

export default function NavBar() {
const {adminName, setAdminName} = useContext(AdminContext)
const {scoreState} = useContext(ScoreContext)
const {playerData,setPlayerData} = useContext(PlayerContext)
const {pathname} = useLocation()
 {/* check to see if the current route is the login, welcome or goodbye page, if so, disable component */}
  let componentEnabled : boolean = true
  if(pathname === "/" || pathname === "/Goodbye" ||  pathname === "/Welcome" || pathname === "/HowToPlay"){
    componentEnabled= false
  }

   useEffect(() => {
      if (playerData.player_name === null && componentEnabled) {
        const savedData = localStorage.getItem("The_Administrator_Game");
        if (savedData) {
          const storedPlayerData : playerDataShape = JSON.parse(savedData)
          setPlayerData(storedPlayerData)
        }
      }
      else{
        // saveLocalData(playerData)
      }
    }, [playerData]);

    return (
        <>
        {componentEnabled && 
    <nav>
      {playerData ? (
        <>
          <div id="desktop-nav">
            <div id="interactive-nav-el-container">
              <SoundControl mobile={false} />
              <TutorialButton />
            </div>

            <CommandInput adminNameSetter={setAdminName} />
            <ScoreTracker scoreState={playerData.player_credits} />
          </div>
          <MobileMenu />
        </>
      ) : (
        <NotLoggedIn soundControls />
      )}
    
    </nav>
}
    </>
  );
}
