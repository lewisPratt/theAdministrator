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
export default function PersonalRecord() {
  const navigate = useNavigate();
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const { setCurrentSlug } = useContext(CurrentSlugContext);

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
          
          <p>View your mediocre personal achievements & upgrades.</p>

          {/* //upgrades unlocked component */}
          <UnlockedUpgrades />
          <button
            id="visit-upgrades-button"
            onClick={() => {
              navigate("/UpgradeShop");
              setCurrentSlug("nav.upgrade");
            }}
          >
            Upgrade Terminal
          </button>
          <h2 id="tutorial-step-16" className={(tutorialState.tutorialActive && tutorialState.tutorialStep === 16 ? "tutorial-highlight":"")}>Statistics</h2>
          {/* //total cases reviewed component */}

          {/* //pass/fail ratio */}

          {/* //reset data component */}
          <Tooltip id="unlocks-tooltip" className="custom-tooltip" />

        </section>
      )}
    </>
  );
}
