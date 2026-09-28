import { useContext } from "react";

import { UnlocksContext } from "../../context_providers/unlocksContext";
import type { unlockContextShape } from "../../interfaces/interfaces";
import { allVouchers } from "../../generator_modules/vouchers";
import { v4 as uuidv4 } from "uuid";
import { Badge } from "lucide-react";
import { CreditIcon } from "../../assets/custom_icons/credits";

export default function UnlockedBadges() {
  const { playerUnlocks } = useContext<unlockContextShape>(UnlocksContext);

  console.log(playerUnlocks);
  return (
    <section id="badge-unlocks">
       <h3>Badges</h3>
      <div id="badge-parent">
       
        {playerUnlocks?.map((unlock) => {
          const thisVoucher = allVouchers[`${unlock}`];

          if (thisVoucher.type === "badge") {
         
            return (
              <div key={uuidv4()} className="badge-holder" data-tooltip-id="unlocks-tooltip" data-tooltip-content={thisVoucher.perkEffect}>
                <Badge size={96}>{thisVoucher.icon}</Badge>
                <p >
                  {thisVoucher.name} <br /> <span className="badge-cost"> <CreditIcon size={15} className="custom-icon" />{thisVoucher.cost}</span>
                </p>
              </div>
            );
          }
        })}
      </div>
    </section>
  );
}
