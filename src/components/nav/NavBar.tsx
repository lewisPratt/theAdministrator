import CommandInput from "./CommandInput";
import NotLoggedIn from "./NotLoggedIn";
import ScoreTracker from "./ScoreTracker";
import SoundControl from "./SoundControl";
import TutorialButton from "./TutorialButton";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PlayerContext } from "../../context_providers/PlayerContext";
import type { playerDataShape } from "../../interfaces/interfaces";
import { isPlayer, saveLocalData } from "../../assets/utils/helpers";
import { Tooltip } from "react-tooltip";
import { ErrorContext } from "../../context_providers/ErrorContext";
export default function NavBar() {
  const [dataError] = useState<string | null>(null)
  const { playerData, setPlayerData } = useContext(PlayerContext);
  const {setErrorState } = useContext(ErrorContext);

  const { pathname } = useLocation();

  {
    /* check to see if player is logged in or currently on a page where the nav should not be visible */
  }
  let componentEnabled: boolean = true;
  if ( !sessionStorage.getItem("admin_game_status") || 
    pathname === "/" ||
    pathname === "/Goodbye" ||
    pathname === "/Welcome" ||
    pathname === "/HowToPlay"
  ) {
    componentEnabled = false;
  }

  
  
  function tryParse(storageKey : string){
    try {
          const savedData = localStorage.getItem(storageKey);
          if(savedData === null){
            return null
          }
          
          const decodedData = atob(savedData)
          const parsedData = JSON.parse(decodedData)
          return parsedData;

    } catch (error) {
      console.log("couldn't login: "+ error)
    }
  }



  useEffect(() => {
    if (playerData === null && componentEnabled) {

        const savedData :playerDataShape = tryParse("The_Administrator_Game");
        if (savedData) {
          if(isPlayer(savedData)){
            setPlayerData(savedData);
          }
          else{
          //type guard failed, saved player data does not match expected type
          //CODE #1
          setErrorState("There was an issue with your saved game data. #1")
          }
        }
        else{
        // No local storage item found with the specified key
        // CODE #2
        setErrorState("There was an issue with your saved game data. #2")
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
            <NotLoggedIn soundControls={false} dataError={dataError} />
          )}
          <Tooltip id="nav-bar-tooltip" className="custom-tooltip"></Tooltip>
        </nav>
      )}
    </>
  );
}
