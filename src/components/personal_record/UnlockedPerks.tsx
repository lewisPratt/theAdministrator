import { useContext } from "react";
import { UnlocksContext } from "../../context_providers/unlocksContext";
import type { unlockContextShape } from "../../interfaces/interfaces";
import { allVouchers } from "../../generator_modules/vouchers";
import { v4 as uuidv4 } from "uuid";
import { Badge } from "lucide-react";
export default function UnlockedPerks() {
  const { playerUnlocks } = useContext<unlockContextShape>(UnlocksContext);

  console.log(playerUnlocks);
  return (
    <section id="perk-unlocks">
      <h3>Perks</h3>
<div id="badge-parent">
      {playerUnlocks?.map((unlock)=>{
        const thisVoucher = allVouchers[`${unlock}`]
        if(thisVoucher.type === "perk"){
         return (
              <div key={uuidv4()} className="badge-holder" data-tooltip-id="unlocks-tooltip" data-tooltip-content={thisVoucher.perkEffect}>
                <Badge size={96}>{thisVoucher.icon}</Badge>
                <p >
                  {thisVoucher.name} <br /> <span className="badge-cost"> C{thisVoucher.cost}</span>
                  
                </p>
              </div>
            );
        }
      })}
      </div>
    </section>
  );
}
