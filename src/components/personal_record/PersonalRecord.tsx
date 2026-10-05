import UnlockedUpgrades from "./UnlockedUpgrades";
import "../../assets/css/personalRecord.css";
import { Tooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { LoaderCircle } from "lucide-react";
import { CurrentSlugContext } from "../../context_providers/CurrentSlugContext";

import { TutorialContext } from "../../context_providers/TutorialContext";
import type { TooltipRefProps } from "react-tooltip";
import { useRef } from "react";
import TutorialLogic from "../tutorial/TutorialLogic";
import { PlayerContext } from "../../context_providers/PlayerContext";
import PlayerStats from "./PlayerStats";
export default function PersonalRecord() {
  const navigate = useNavigate();
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const { setCurrentSlug } = useContext(CurrentSlugContext);
  const {playerData} = useContext(PlayerContext)
  const {tutorialState} = useContext(TutorialContext)
  const tooltipRef1 = useRef<TooltipRefProps>(null);
  
  //turn off loading indicator after set interval
  useEffect(() => {
    setTimeout(setLoadingState, 2000, false);
  }, []);

  
  return (
    <>
    <TutorialLogic loadingState={loadingState} tooltipRef={tooltipRef1}/>
    
      {loadingState ? (
        <p>
          <LoaderCircle className="loader" />
        </p>
      ) : (
        <section id="personal-record">
          <p>Administrator</p>
          <h1>{playerData?.player_name}</h1>
          <p className="personal-record-tagline">View your mediocre personal achievements & upgrades.</p>

          {/* //upgrades unlocked component */}
          <UnlockedUpgrades />
       
          
          <PlayerStats />

          {/* //pass/fail ratio */}

          {/* //reset data component */}
          <Tooltip id="unlocks-tooltip" className="custom-tooltip" />

        </section>
      )}
    </>
  );
}
