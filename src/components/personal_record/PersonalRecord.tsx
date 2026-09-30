import UnlockedUpgrades from "./UnlockedUpgrades";
import "../../assets/css/personalRecord.css";
import { Tooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { LoaderCircle } from "lucide-react";
import { CurrentSlugContext } from "../../context_providers/CurrentSlugContext";

import TutorialOverlay from "../TutorialOverlay";
import { TutorialContext } from "../../context_providers/TutorialContext";
import TutorialSteps from "../tutorial/TutorialSteps";
import type { TooltipRefProps } from "react-tooltip";
import { useRef } from "react";

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

   //manage tutorial activation and progression through steps as well as closure when tutorial is deactivated.
      useEffect(() => {
        if (tutorialState.tutorialActive) {
            tooltipRef1.current?.open({
              anchorSelect: "#tutorial-step-"+tutorialState.tutorialStep,
              content: <TutorialSteps stepNumber={tutorialState.tutorialStep} />
            });      
        }
        if(!tutorialState.tutorialActive){
          tooltipRef1.current?.close()
        }
      }, [tutorialState, loadingState]);
  return (
    <>
      {loadingState ? (
        <p>
          <LoaderCircle className="loader" />
        </p>
      ) : (
        <section id="personal-record">
          { tutorialState.tutorialActive && <TutorialOverlay />}
          
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
          {/* //total cases reviewed component */}

          {/* //pass/fail ratio */}

          {/* //reset data component */}
          <Tooltip id="unlocks-tooltip" className="custom-tooltip" />
                    <Tooltip className="custom-tooltip" ref={tooltipRef1} imperativeModeOnly clickable/>

        </section>
      )}
    </>
  );
}
