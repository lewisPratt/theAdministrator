import { allVouchers } from "../../generator_modules/vouchers";
import type { VoucherListShape, VoucherShape } from "../../interfaces/interfaces";

/**
 * Capitalizes the first letter of the string passed to it, returning a capitalized string
 * @param {string} val - the string that is to be capitalized
 * @return {string} The capitalized string
 */
export function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

/** 
* Checks player unlocks against an array of provided values. returns an array with identified unlocks
* @summary used to conditionall render ui elements depending on whether the userunlocks context includes the values provided. 
* @param {string[]} wanted - The names of the unlocks that we are checking to see if they are present eg. ["voucher1", "voucher5"]
*  @param {string[]} unlocks - The array of unlocked items provided by the unlocks context in a parent component. 

* @return {string[]} returns an array of strings indicating unlocks purchased that match the wanted values.
*/
export function checkUnlocks(
  wanted: string[],
  unlocks: string[] | null,
): string[] {
  let found: string[] = [];

  if (unlocks) {
    wanted.forEach((unlock) => {
      unlocks.filter((u) => {
        if (u === unlock) {
          found.push(u);
        }
      });
    });
  } else {
    //no unlocks passed
  }
  return found;
}


export function getUnlockDetails(unlocked : string[] | null) :VoucherShape[]{
  
  let voucherArray :VoucherShape[] =[]
  if(unlocked){
  unlocked.forEach(unlock => {
    if(allVouchers[unlock]){
      console.log("an unlock for you: ",allVouchers[unlock])
      voucherArray.push(allVouchers[unlock])
    }
  });
}
return voucherArray
}
