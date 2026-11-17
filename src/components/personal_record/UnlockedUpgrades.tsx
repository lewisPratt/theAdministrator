import { useContext } from "react";

import { allUpgrades } from "../../content_generators/upgrades";
import { v4 as uuidv4 } from "uuid";
import { Badge } from "lucide-react";
import { TutorialContext } from "../../context_providers/TutorialContext";
import { PlayerContext } from "../../context_providers/PlayerContext";

export default function UnlockedUpgrades() {
  const {tutorialState} = useContext(TutorialContext)
  const {playerData} = useContext(PlayerContext)
  return (
    <section id="tutorial-step-15" className={(tutorialState.tutorialActive && tutorialState.tutorialStep === 15 ? "tutorial-highlight":"") +" badge-unlocks"}>
       <h2>Upgrades</h2>
      <div id="badge-parent">
       
        {playerData?.player_unlocks.map((unlock) => {
          const thisVoucher = allUpgrades[`${unlock}`];
         
            return (
              <div key={uuidv4()} className="badge-holder" data-tooltip-id="unlocks-tooltip" data-tooltip-content={thisVoucher.perkEffect}>
                <Badge size={56}>{thisVoucher.icon}</Badge>
              </div>
            );
          
        })}
      </div>
    </section>
  );
}
