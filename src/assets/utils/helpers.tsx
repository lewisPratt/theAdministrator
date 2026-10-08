import { locations } from "../../generator_modules/LocationGenerator";
import { occupations } from "../../generator_modules/OccupationGenerator";
import { allUpgrades } from "../../generator_modules/upgrades";
import type { locationsShape, occupationsShape, playerDataShape, UpgradeShape } from "../../interfaces/interfaces";

/**
 * Capitalizes the first letter of the string passed to it, returning a capitalized string
 * @param {string} val - the string that is to be capitalized
 * @return {string} The capitalized string
 */
export function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}




export function getUnlockDetails(playerData : playerDataShape | null) :UpgradeShape[]{
  
  let voucherArray :UpgradeShape[] =[]
  if(playerData){
  playerData.player_unlocks.forEach(unlock => {
    if(allUpgrades[unlock]){
      voucherArray.push(allUpgrades[unlock])
    }
  });
}
return voucherArray
}


export function saveLocalData(playerData : playerDataShape){
  console.log("helper function: ",playerData)
   localStorage.setItem("The_Administrator_Game", JSON.stringify(playerData))

}

export function getDetailsForDistrict(district:number){
  let occupationArray : occupationsShape[] = occupations.filter((location)=>{
      return location.district === district
  })
  let locationArray : locationsShape[] = locations.filter((location)=>{
      return location.district === district
  })
  return {occupations :occupationArray, locations : locationArray, districtNumber:district, activeList:"occupations"}

}