import { useContext } from "react";

import { UnlocksContext } from "../../context_providers/unlocksContext";
import type { unlockContextShape } from "../../interfaces/interfaces";
import { allVouchers } from "../../generator_modules/vouchers";
export default function UnlockedBadges() {
  const { playerUnlocks } = useContext<unlockContextShape>(UnlocksContext);

  console.log(playerUnlocks);
  return (
    <section id="badge-unlocks">
      <p>A list of your unlocked badges</p>
      {playerUnlocks?.map((unlock)=>{
        const thisVoucher = allVouchers[`${unlock}`]
        if(thisVoucher.type === "badge"){
        return <p>{thisVoucher.name} - {thisVoucher.icon}</p>
        }
      })}
    </section>
  );
}
