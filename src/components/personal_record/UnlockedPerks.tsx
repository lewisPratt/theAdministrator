import { useContext } from "react";
import { UnlocksContext } from "../../context_providers/unlocksContext";
import type { unlockContextShape } from "../../interfaces/interfaces";
import { allVouchers } from "../../generator_modules/vouchers";
export default function UnlockedPerks() {
  const { playerUnlocks } = useContext<unlockContextShape>(UnlocksContext);

  console.log(playerUnlocks);
  return (
    <section id="perk-unlocks">
      <p>A list of your unlocked perks</p>
      {playerUnlocks?.map((unlock)=>{
        const thisVoucher = allVouchers[`${unlock}`]
        if(thisVoucher.type === "perk"){
        return <p>{thisVoucher.name}</p>
        }
      })}
    </section>
  );
}
