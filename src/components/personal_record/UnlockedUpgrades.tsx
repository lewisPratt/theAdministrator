import { useContext } from "react";

import { UnlocksContext } from "../../context_providers/unlocksContext";
import type { unlockContextShape } from "../../interfaces/interfaces";
import { allUpgrades } from "../../generator_modules/upgrades";
import { v4 as uuidv4 } from "uuid";
import { Badge } from "lucide-react";
import { CreditIcon } from "../../assets/custom_icons/credits";
import { TutorialContext } from "../../context_providers/TutorialContext";
import { PlayerContext } from "../../context_providers/PlayerContext";

export default function UnlockedUpgrades() {
  const { playerUnlocks } = useContext<unlockContextShape>(UnlocksContext);
  const {tutorialState} = useContext(TutorialContext)
  const {playerData} = useContext(PlayerContext)
  console.log(playerUnlocks);
  return (
    <section id="tutorial-step-15" className={(tutorialState.tutorialActive && tutorialState.tutorialStep === 15 ? "tutorial-highlight":"") +" badge-unlocks"}>
       <h3>Upgrades</h3>
      <div id="badge-parent">
       
        {playerData?.player_unlocks.map((unlock) => {
          const thisVoucher = allUpgrades[`${unlock}`];
         
            return (
              <div key={uuidv4()} className="badge-holder" data-tooltip-id="unlocks-tooltip" data-tooltip-content={thisVoucher.perkEffect}>
                <Badge size={96}>{thisVoucher.icon}</Badge>
                <p >
                  {thisVoucher.name} <br /> <span className="badge-cost"> <CreditIcon size={15} className="custom-icon" />{thisVoucher.cost}</span>
                </p>
              </div>
            );
          
        })}
      </div>
    </section>
  );
}
