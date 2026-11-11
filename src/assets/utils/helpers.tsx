import { locations } from "../../generator_modules/LocationGenerator";
import { occupations } from "../../generator_modules/OccupationGenerator";
import { allUpgrades } from "../../generator_modules/upgrades";
import type { districtDetails, locationsShape, occupationsShape, playerDataShape, playerStatsShape, UpgradeShape } from "../../interfaces/interfaces";
import keystroke_1 from "../../assets/sounds/keystroke_hard.mp3"
import keystroke_2 from "../../assets/sounds/keystroke_medium.mp3"
import keystroke_3 from "../../assets/sounds/keystroke_soft.mp3"
import buttonpress from "../../assets/sounds/button_soft.mp3"
import call_1 from "../../assets/sounds/call_1.mp3"
import call_2 from "../../assets/sounds/call_2.mp3"
import call_3 from "../../assets/sounds/call_3.mp3"
import call_4 from "../../assets/sounds/call_4.mp3"
import errorSound from "../../assets/sounds/error.mp3"
import sucessSound from "../../assets/sounds/success_bling.mp3"
import { playSound } from "react-sounds";
import getDistrictName from "../../generator_modules/DistrictNames";
/**
 * Capitalizes the first letter of the string passed to it, returning a capitalized string
 * @param {string} val - the string that is to be capitalized
 * @return {string} The capitalized string
 */
export function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}




export function getUnlockDetails(playerData : playerDataShape | null) :UpgradeShape[]{
  
  const voucherArray :UpgradeShape[] =[]
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
    const stringyData = JSON.stringify(playerData)
    const encodedData = btoa(stringyData)
   localStorage.setItem("The_Administrator_Game", encodedData)
}

export function getDetailsForDistrict(district:number) :districtDetails{

  let dName = getDistrictName(district)
  if(dName === null){
    dName = "missing data"
  }

  
  const occupationArray : occupationsShape[] = occupations.filter((location)=>{
      return location.district === district
  })
  const locationArray : locationsShape[] = locations.filter((location)=>{
      return location.district === district
  })
  return  {occupations :occupationArray, locations : locationArray, districtNumber:district, districtName: dName, activeList:"occupations"}

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

  export function playKeyStroke() {
    const keystrokes = [
      keystroke_1,
     keystroke_2,
      keystroke_3,
    ];
    const strokeSound = Math.floor(Math.random() * keystrokes.length);
    const playStroke = playSound(keystrokes[strokeSound], {volume:0.5, loop:false});
    return playStroke;
  }

  export function playCustomSound(soundName : string){
    const callContentSounds = [
      call_1,
      call_2,
      call_3,
      call_4
    ]
    const callContent = Math.floor(Math.random() * callContentSounds.length);

    switch (soundName) {
      case "errorSound":
        return playSound(errorSound, {volume:0.5, loop:false});
      case "buttonPress":
        return playSound(buttonpress, {volume:0.5, loop:false});
      case "successSound":
         return playSound(sucessSound, {volume:0.5, loop:false});
      case "callContent":
         return playSound(callContentSounds[callContent], {volume:0.5, loop:false});

      default:
        break;
    }
    
  }