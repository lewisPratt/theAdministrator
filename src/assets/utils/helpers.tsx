import { allUpgrades } from "../../generator_modules/upgrades";
import type { UpgradeShape } from "../../interfaces/interfaces";

/**
 * Capitalizes the first letter of the string passed to it, returning a capitalized string
 * @param {string} val - the string that is to be capitalized
 * @return {string} The capitalized string
 */
export function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}




export function getUnlockDetails(unlocked : string[] | null) :UpgradeShape[]{
  
  let voucherArray :UpgradeShape[] =[]
  if(unlocked){
  unlocked.forEach(unlock => {
    if(allUpgrades[unlock]){
      voucherArray.push(allUpgrades[unlock])
    }
  });
}
return voucherArray
}
