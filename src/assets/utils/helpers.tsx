import { locations } from "../../generator_modules/LocationGenerator";
import { occupations } from "../../generator_modules/OccupationGenerator";
import { allUpgrades } from "../../generator_modules/upgrades";
import type { locationsShape, occupationsShape, playerDataShape, playerStatsShape, UpgradeShape } from "../../interfaces/interfaces";

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

export function checkUpgradeActive(unlocks : string[] | undefined, voucher: string) : boolean{

  if(unlocks)
    return unlocks.includes(voucher)
  else 
    return false

}

// Type Guard checks for loading locally stored player data
  //checks that stored data matches the expected shape we want for player data. 
  export function isPlayer(value : unknown) : value is playerDataShape{
    return (
      typeof value === "object" &&
      value != null &&
      typeof (value as playerDataShape).player_credits === "number"&&
      typeof (value as playerDataShape).player_name === "string"&&
      typeof (value as playerDataShape).player_title === "string" &&
      isStats((value as playerDataShape).player_stats) &&
      Array.isArray((value as playerDataShape).player_titles)  &&
      typeof (value as playerDataShape).player_tutorialComplete === "boolean" &&
      Array.isArray((value as playerDataShape).player_unlocks)

    )
  }
export function isStats(value : unknown) : value is playerStatsShape {
    return (
      typeof value === "object" &&
      value != null &&
      typeof (value as playerStatsShape).cases_complete === "number" &&
      typeof (value as playerStatsShape).cases_correct === "number" &&
      typeof (value as playerStatsShape).cases_failed === "number" &&
      typeof (value as playerStatsShape).player_promotions === "number" &&
      typeof (value as playerStatsShape).total_credits_earned === "number" &&
      typeof (value as playerStatsShape).total_credits_lost === "number" 
    )
  }