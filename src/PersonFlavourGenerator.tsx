import type {
  weatherShape,
  occupationsShape,
  nameShape,
  locationsShape,
  carryableItemsShape,
} from "./interfaces";
//////////////////////////////////////////////////////
//flavour banks
//////////////////////////////////////////////////////
const behaviourReactions: Record<string, string[]> = {
  "Compliant": [
    "answered every question promptly and without hesitation",
    "maintained a calm, cooperative tone throughout",
    "responded politely, offering no resistance",
  ],
  "Non-compliant": [
    "grew visibly tense and avoided direct answers",
    "answered in short, clipped responses",
    "seemed agitated when pressed on routine questions",
  ],
  "Indifferent": [
    "answered flatly, showing little interest in the process",
    "responded without much care either way",
    "seemed distracted, barely engaging with the questions",
  ],
};

const occupationContextByDistrict: Record<number, string[]> = {
  1: [ // Central Administration
    "spoke of their work as a {occupation} with the practiced ease of someone used to filling out forms",
    "recited their role as {occupation} like it had been said a thousand times before",
    "answered questions about their job as {occupation} without looking up from their papers",
  ],
  2: [ // Detention & Security
    "stated their role as {occupation} firmly, clearly used to being questioned rather than doing the questioning",
    "answered with the flat confidence of a {occupation} who works on the other side of this desk",
    "seemed unbothered discussing their work as {occupation}, as if the interview were routine",
  ],
  3: [ // Industrial / Power
    "spoke of their work as a {occupation} with the calloused hands and tired eyes of someone on long shifts",
    "smelled faintly of grease and solvent, consistent with their claimed role as {occupation}",
    "answered plainly about their job as {occupation}, more concerned with getting back to work",
  ],
  4: [ // Water & Sewage
    "carried the damp, mineral smell expected of a {occupation}",
    "answered briefly when asked about their work as {occupation}, clearly eager to leave",
  ],
  5: [ // Housing
    "spoke with the weary patience of a {occupation} who deals with tenants all day",
    "answered carefully about their role as {occupation}, aware that complaints get people noticed",
  ],
  6: [ // Markets (legit)
    "spoke with the easy charm of a {occupation} used to haggling",
    "answered cheerfully about their work as {occupation}, perhaps a little too cheerfully",
  ],
  7: [ // Black Market
    "hesitated slightly before confirming their role as {occupation}",
    "gave an answer about their work as {occupation} that didn't quite match the confidence in their eyes",
    "seemed to choose their words with unusual care when asked about being a {occupation}",
  ],
  8: [ // Nightlife & Vice
    "answered with a knowing smile when asked about their work as {occupation}",
    "seemed more alert than the hour would suggest for a {occupation}",
  ],
  9: [ // Food & Dining
    "answered between glances at the clock, clearly mid-shift as a {occupation}",
    "had the tired but easy manner of a {occupation} on their feet all day",
  ],
  10: [ // Medical
    "answered with the clinical precision expected of a {occupation}",
    "spoke calmly about their work as {occupation}, the way people do when they're used to delivering bad news",
  ],
  11: [ // Transport & Freight
    "answered with the clipped efficiency of a {occupation} on a tight schedule",
    "kept glancing toward the platform, restless, while discussing their role as {occupation}",
  ],
  12: [ // Communications
    "chose their words carefully when asked about their work as {occupation}, aware of who might be listening",
    "answered evenly about being a {occupation}, betraying nothing",
  ],
  13: [ // Outskirts / Slums
    "answered warily about their work as {occupation}, the way people do when authority rarely brings good news",
    "seemed resigned discussing their role as {occupation}, as though this interview changes nothing either way",
  ],
};




function getOccupationContext(occupation: occupationsShape): string {
  const pool = occupationContextByDistrict[occupation.district];
  const template = pool[Math.floor(Math.random() * pool.length)];
  return template.replace("{occupation}", occupation.name);
}

function getBehaviourReaction(behaviour: string): string {
  const pool = behaviourReactions[behaviour];
  const choice = pool[Math.floor(Math.random() * pool.length)];
  return choice;
}
function getPronouns(gender: string) :string[]{
    let pronouns : string[] = []
    if(gender === "male"){
        pronouns = ["he", "him", "his"]
    }else if(gender === "female"){
        pronouns = ["she", "her", "hers"]
    }else if(gender === "synth"){
        pronouns = ["they", "them", "its"]
    }
    return pronouns
}
export function PersonFlavourGenerator(
  behaviour: string,
  weather: weatherShape,
  occupation: occupationsShape,
  recreationPass: boolean,
  personName: nameShape,
  age: number,
  location: locationsShape,
  items: carryableItemsShape[],
  gender: string
) {
  return personName.lastName+' ' + getBehaviourReaction(behaviour)+ '. '+ getPronouns(gender)[0]+' ' + getOccupationContext(occupation)
}
