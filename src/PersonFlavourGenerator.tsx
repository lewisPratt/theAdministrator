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
    "spoke of working as a {occupation} with the practiced ease of someone used to filling out forms",
    "recited {pronoun} role as {occupation} like it had been said a thousand times before",
    "answered questions about {pronoun} job as {occupation} without looking up from {pronoun} papers",
  ],
  2: [ // Detention & Security
    "stated {pronoun} role as {occupation} firmly, clearly used to being questioned rather than doing the questioning",
    "answered with the flat confidence of a {occupation} who works on the other side of this desk",
    "seemed unbothered discussing {pronoun} work as {occupation}, as if the interview were routine",
  ],
  3: [ // Industrial / Power
    "spoke of {pronoun} work as a {occupation} with the calloused hands and tired eyes of someone on long shifts",
    "smelled faintly of grease and solvent, consistent with {pronoun} claimed role as {occupation}",
    "answered plainly about {pronoun} job as {occupation}, more concerned with getting back to work",
  ],
  4: [ // Water & Sewage
    "carried the damp, mineral smell expected of a {occupation}",
    "answered briefly when asked about {pronoun} work as {occupation}, clearly eager to leave",
  ],
  5: [ // Housing
    "spoke with the weary patience of a {occupation} who deals with tenants all day",
    "answered carefully about {pronoun} role as {occupation}, aware that complaints get people noticed",
  ],
  6: [ // Markets (legit)
    "spoke with the easy charm of a {occupation} used to haggling",
    "answered cheerfully about {pronoun} work as {occupation}, perhaps a little too cheerfully",
  ],
  7: [ // Black Market
    "hesitated slightly before confirming {pronoun} role as {occupation}",
    "gave an answer about {pronoun} work as {occupation} that didn't quite match the confidence in {pronoun} eyes",
    "seemed to choose {pronoun} words with unusual care when asked about being a {occupation}",
  ],
  8: [ // Nightlife & Vice
    "answered with a knowing smile when asked about {pronoun} work as {occupation}",
    "seemed more alert than the hour would suggest for a {occupation}",
  ],
  9: [ // Food & Dining
    "answered between glances at the clock, clearly mid-shift as a {occupation}",
    "had the tired but easy manner of a {occupation} on {pronoun} feet all day",
  ],
  10: [ // Medical
    "answered with the clinical precision expected of a {occupation}",
    "spoke calmly about {pronoun} work as {occupation}, the way people do when they're used to delivering bad news",
  ],
  11: [ // Transport & Freight
    "answered with the clipped efficiency of a {occupation} on a tight schedule",
    "kept glancing toward the platform, restless, while discussing {pronoun} role as {occupation}",
  ],
  12: [ // Communications
    "chose {pronoun} words carefully when asked about {pronoun} work as {occupation}, aware of who might be listening",
    "answered evenly about being a {occupation}, betraying nothing",
  ],
  13: [ // Outskirts / Slums
    "answered warily about {pronoun} work as {occupation}, the way people do when authority rarely brings good news",
    "seemed resigned discussing {pronoun} role as {occupation}, as though this interview changes nothing either way",
  ],
};

const recreationPassContext: Record<"true" | "false", string[]> = {
  "true": [
    "produced a valid RecPass without being asked twice.",
    "mentioned {pronoun} RecPass casually, as though visiting District 8 were nothing unusual.",
    "seemed at ease when the topic of leisure time came up, pass already in hand.",
    "had {pronoun} RecPass in order, well-worn from frequent use.",
    "took out {pronoun} RecPass and handed it over before even being asked to do so.",
    "searched for {pronoun} RecPass for several seconds but eventually produced it with an embarrassed half smile.",
    "initially looked puzzled at the request to produce {pronoun} RecPass, but then appeared to understand and pulled it from an inside pocket.",
    "confidently unfastened {pronoun} outer layer and showed a worn RecPass hanging on a piece of cord around {pronoun} neck.",
    "opened {pronoun} CredPac and showed a valid RecPass with little fuss.",
    "took {pronoun} time extracting {pronoun} RecPass from some hidden pocket deep within {pronoun} jacket.",
    "appeared happy to oblige and produced {pronoun} RecPass when asked."
  ],
  "false": [
    "had no RecPass on file, and grew quiet when the topic came up",
    "claimed no interest in District 8, though the question seemed to cause {pronoun} demeanor to change.",
    "lacked a RecPass entirely — official leisure time isn't something they're permitted.",
    "answered vaguely when asked about recreation, clearly aware they have no pass to show.",
    "began to search {pronoun} pockets looking for the pass, that was clearly not there.",
    "tried to give a series of excuses before admitting that {pronoun} RecPass had expired weeks ago.",
    "seemed to have a sudden realization, then stated that {pronoun} RecPass was on {pronoun} bedside terminal at home.",
    "started stuttering and appeared to be stalling for time, before admitting that {pronoun} RecPass had expired weeks ago."
  ],
};



function getRecreationPassContext(recreationPass: boolean): string {
  const key = recreationPass ? "true" : "false";
  const pool = recreationPassContext[key];
  return pool[Math.floor(Math.random() * pool.length)];
}

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
        pronouns = ["she", "her", "her"]
    }else if(gender === "synth"){
        pronouns = ["it", "it", "its"]
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
    const pronoun = getPronouns(gender)

    const subjectPronoun = pronoun[0]
    const capitalizedSubjectPronoun = subjectPronoun.charAt(0).toUpperCase() + subjectPronoun.slice(1)

    const objectPronoun = pronoun[1]
    const capitalizedObjectPronoun = objectPronoun.charAt(0).toUpperCase() + objectPronoun.slice(1)

     const possessivePronoun = pronoun[2]
    const capitalizedPossessivePronoun = possessivePronoun.charAt(0).toUpperCase() + possessivePronoun.slice(1)

  return personName.lastName+' ' + getBehaviourReaction(behaviour)+ '. '+ capitalizedSubjectPronoun+' ' + getOccupationContext(occupation).replaceAll("{pronoun}", possessivePronoun) +'. ' + capitalizedSubjectPronoun + ' '+getRecreationPassContext(recreationPass).replaceAll("{pronoun}", possessivePronoun)
}
