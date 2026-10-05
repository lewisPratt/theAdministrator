import MobileMenu from "../MobileMenu";
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
const {playerData,setPlayerData} = useContext(PlayerContext)
const {pathname} = useLocation()

 {/* check to see if the current route is the login, welcome or goodbye page, if so, disable component */}
  let componentEnabled : boolean = true
  if(pathname === "/" || pathname === "/Goodbye" ||  pathname === "/Welcome" || pathname === "/HowToPlay"){
    componentEnabled= false
  }

   useEffect(() => {
      if (playerData === null && componentEnabled) {
        const savedData = localStorage.getItem("The_Administrator_Game");
        if (savedData) {
          const storedPlayerData : playerDataShape = JSON.parse(savedData)
          setPlayerData(storedPlayerData)
        }
      }
      else if(playerData != null){
        saveLocalData(playerData)
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

            <CommandInput />
            <ScoreTracker />
          </div>
          <MobileMenu />
        </>
      ) : (
        <NotLoggedIn soundControls />
      )}
    <Tooltip id="nav-bar-tooltip" className="custom-tooltip"></Tooltip>
    </nav>
    
}
    </>
  );
}
