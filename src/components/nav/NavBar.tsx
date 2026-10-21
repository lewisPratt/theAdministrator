import CommandInput from "./CommandInput";
import NotLoggedIn from "./NotLoggedIn";
import ScoreTracker from "./ScoreTracker";
import SoundControl from "./SoundControl";
import TutorialButton from "./TutorialButton";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PlayerContext } from "../../context_providers/PlayerContext";
import type { playerDataShape, playerStatsShape } from "../../interfaces/interfaces";
import { saveLocalData } from "../../assets/utils/helpers";
import { Tooltip } from "react-tooltip";
export default function NavBar() {
  const { playerData, setPlayerData } = useContext(PlayerContext);
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

  // Type Guard checks for loading locally stored player data
  //checks that stored data matches the expected shape we want for player data. 
  function isPlayer(value : unknown) : value is playerDataShape{
    return (
      typeof value === "object" &&
      value != null &&
      typeof (value as playerDataShape).player_credits === "number"&&
      typeof (value as playerDataShape).player_name === "string"&&
      typeof (value as playerDataShape).player_title === "string" &&
      isStats((value as playerDataShape).player_stats) &&
      Array.isArray((value as playerDataShape).player_titles)  &&
      typeof (value as playerDataShape).player_tutorialComplete === "boolean" &&
      Array.isArray((value as playerDataShape).player_unlocks)

    )
  }
  function isStats(value : unknown) : value is playerStatsShape {
    return (
      typeof value === "object" &&
      value != null &&
      typeof (value as playerStatsShape).cases_complete === "number" &&
      typeof (value as playerStatsShape).cases_correct === "number" &&
      typeof (value as playerStatsShape).cases_failed === "number" &&
      typeof (value as playerStatsShape).player_promotions === "number" &&
      typeof (value as playerStatsShape).total_credits_earned === "number" &&
      typeof (value as playerStatsShape).total_credits_lost === "number" 
    )
  }

  useEffect(() => {
    if (playerData === null && componentEnabled) {
      try {
        const savedData = localStorage.getItem("The_Administrator_Game");
        if (savedData) {
          const storedPlayerData: playerDataShape = JSON.parse(savedData);
          if(isPlayer(storedPlayerData)){
            setPlayerData(storedPlayerData);
          }
          else{
          //type guard failed, saved player data does not match expected type
          }
        }
      } catch (error) {
        //failed to parse JSON
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
