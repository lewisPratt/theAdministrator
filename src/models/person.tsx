import type {
  weatherShape,
  nameShape,
  carryableItemsShape,
  locationsShape,
  occupationsShape,
  weightingArrayShape,
  encryptedDriveShape,
} from "../interfaces/interfaces";
import { v4 as uuidv4 } from "uuid";
import { createName } from "../generator_modules/NameArrays";
import { createItems } from "../generator_modules/CarryableItems";
import { CreateOccupation } from "../generator_modules/OccupationGenerator";
import createLocation from "../generator_modules/LocationGenerator";
import generateWeather from "../generator_modules/WeatherGenerator";
import { generateAuthorizedLocations } from "../generator_modules/AuthorizedLocationGenerator";
import { generateBehaviour } from "../generator_modules/behaviourGenerator";
import { PersonFlavourGenerator } from "../generator_modules/PersonFlavourGenerator";
import { positiveLeaningClues, negativeLeaningClues } from "../generator_modules/driveOutcomes";
import { driveKeys } from "../generator_modules/driveKeys";

export class person {
  interviewee: nameShape;
  items: carryableItemsShape[];
  age: number;
  location: locationsShape;
  recreationPass: boolean;
  authorizedLocations: number[];
  occupation: occupationsShape;
  overallWeighting: number;
  weightingArray: weightingArrayShape[];
  weather: weatherShape;
  behaviour: string;
  processed: boolean;
  decision: string;
  decisionOutcome: boolean | null;
  outcomeCategory: string
  personFlavour: string;
  gender: string;
  identifier: string;
  bonusCase: boolean;
  rewardEarned: number;
  avatar: string;
  revealItem: boolean;
  encryptedDrive: encryptedDriveShape;
  constructor() {
    this.interviewee = createName();
    this.items = createItems();
    this.age = Math.round(Math.random() * 80) + 15;
    this.location = createLocation();
    this.recreationPass = this.generateRecreationPass();
    this.authorizedLocations = generateAuthorizedLocations();
    this.occupation = CreateOccupation();
    this.weightingArray = [];
    this.weather = generateWeather();
    this.behaviour = generateBehaviour();
    this.overallWeighting = this.workOutWeighting();
    this.processed = false;
    this.decision = "";
    this.decisionOutcome = null;
    this.outcomeCategory = "";
    this.gender = this.generateGender();
    this.personFlavour = PersonFlavourGenerator(
      this.behaviour,
      this.weather,
      this.occupation,
      this.recreationPass,
      this.interviewee,
      this.age,
      this.location,
      this.items,
      this.gender,
    );
    this.identifier = uuidv4();
    this.bonusCase = false;
    this.rewardEarned = 0;
    this.avatar = this.generateAvatar(this.gender, this.behaviour);
    this.revealItem = false
    this.encryptedDrive = this.setDrive()
  }

  private setDrive() : encryptedDriveShape{
    const chance = Math.random()
    console.log(chance)
    if(chance < .4){
      const dataSet = this.overallWeighting > 0 ? positiveLeaningClues : negativeLeaningClues
      const dKey = driveKeys[Math.floor(Math.random() * driveKeys.length)]
      const driveClue = dataSet[Math.floor(Math.random() * dataSet.length)]

      return {activeDrive: true, contents:driveClue,driveKey:dKey, driveLocked: false}
    }else{
      return {activeDrive: false, contents: "",driveKey: "", driveLocked:true}
    }
  }

  private generateGender() {
    const genders = [
      "male",
      "female",
      "male",
      "female",
      "male",
      "female",
      "synth",
      "synth",
    ];
    return genders[Math.floor(Math.random() * genders.length)];
  }

  private generateRecreationPass(): boolean {
    const grantPass: number = Math.round(Math.random() * 1);
    return grantPass === 1 ? true : false;
  }
  //Determines the persons overall weighting (good / normal / bad) determined by the factors generated within this class
  private workOutWeighting(): number {
    let weighting = 0;
    let weightingArray: weightingArrayShape[] = [];
    this.items.forEach((item) => {
      if (!item.legal) {
        weighting -= 1;
        weightingArray.push({weighting:false, evidenceText:"Possession of illegal item."});
      } else if (item.legal) {
        // weighting += 1;
        // weightingArray.push("POSITIVE ITEM");
      }
    });
    if (this.recreationPass) {
      weighting += 1;
      weightingArray.push({weighting:true, evidenceText: "Recpass present."});
    }
    //the person is in a lower district than their job role allows (meaning a street vendor shouldn't be in the communications district)
    if (
      this.location.district < this.occupation.district &&
      this.location.district != 5 &&
      !this.authorizedLocations.includes(this.location.district)
    ) {
      weighting -= 1;
      weightingArray.push({weighting:false, evidenceText:"found in un-authorized district."});
    }
    //if person has no recreation pass and is in the recreation zone (zone 8) they get negative weight
    if (
      !this.recreationPass &&
      this.location.district === 8 &&
      this.occupation.district != 8 &&
      !this.authorizedLocations.includes(8)
    ) {
      weighting -= 1;
      weightingArray.push({weighting:false, evidenceText:"No Recpass in Rec district."});
    }
    if (this.location.district === this.occupation.district) {
      weighting += 1;
      weightingArray.push({weighting:true , evidenceText:"Interviewed at work."});
    }
    if (this.authorizedLocations.includes(this.location.district)) {
      weighting += 1;
      weightingArray.push({weighting:true, evidenceText: "Interviewed in authorized district."});
    }
    if (this.behaviour == "Non-compliant") {
      weighting -= 1;
      weightingArray.push({weighting:false, evidenceText:"Non-compliant behaviour."});
    } else if (this.behaviour == "Compliant") {
      weighting += 1;
      weightingArray.push({weighting:true,  evidenceText: "Compliant behaviour"});
    }

    //specific items
    const idCard = this.items.find((thisItem) => {
      return thisItem.description === "ID card";
    });
    if (idCard) {
      console.log("id card present")
      weighting += 1;
      weightingArray.push({weighting:true,evidenceText:"Id card present"});
    }

    this.weightingArray = [...weightingArray];
    return weighting;
  }
  /**
   *
   * @param gender [string] gender of the citizen the avatar is being generated for. Determines the gender characteristics included in the call to API endpoint
   * @param behaviour [string] behaviour of the citizen the avatar is being generated for. Determines the expressions included in the call to API endpoint
   * @returns [string] URL to the avatar image that has been generated.
   */
  private generateAvatar(gender: string, behaviour: string): string {
    let imageUrl = "";
    const mensHappyUrl =
      "https://api.dicebear.com/10.x/open-peeps/svg?skinColor=49694a&clothingColor=a2eaa2&headContrastColor=75a975&inkColor=a2eaa2&maskProbability=0&expressionVariant=blank,calm,cheeky,cute,driven,eatingHappy,eyesClosed,old,smile&backgroundColor=000000&accessoriesVariant=eyepatch,glasses,glasses2,glasses3,glasses5,sunglasses,sunglasses2&maskVariant=&facialHairProbability=50&headVariant=dreads2,flatTop,flatTopLong,grayShort,hatBeanie,hatHip,mohawk,mohawk2,noHair1,noHair2,noHair3,pomp,shaved2,shaved3,short1,short2,short3,short4,short5,turban,twists,twists2&facialHairVariant=chin,full,full2,full3,full4,goatee1,goatee2,moustache1,moustache2,moustache3,moustache5,moustache6,moustache7,moustache9&seed=" 
  
    const mensAngryUrl =
      "https://api.dicebear.com/10.x/open-peeps/svg?skinColor=49694a&clothingColor=a2eaa2&headContrastColor=75a975&inkColor=a2eaa2&maskProbability=0&expressionVariant=angryWithFang,serious,solemn,suspicious,tired,veryAngry&backgroundColor=000000&accessoriesVariant=eyepatch,glasses,glasses2,glasses3,glasses5,sunglasses,sunglasses2&maskVariant=&facialHairProbability=50&headVariant=dreads2,flatTop,flatTopLong,grayShort,hatBeanie,hatHip,mohawk,mohawk2,noHair1,noHair2,noHair3,pomp,shaved2,shaved3,short1,short2,short3,short4,short5,turban,twists,twists2&facialHairVariant=chin,full,full2,full3,full4,goatee1,goatee2,moustache1,moustache2,moustache3,moustache5,moustache6,moustache7,moustache9&seed=" 
  
    const mensNeutralUrl =
      "https://api.dicebear.com/10.x/open-peeps/svg?skinColor=49694a&clothingColor=a2eaa2&headContrastColor=75a975&inkColor=a2eaa2&maskProbability=0&expressionVariant=blank,eyesClosed,&backgroundColor=000000&accessoriesVariant=eyepatch,glasses,glasses2,glasses3,glasses5,sunglasses,sunglasses2&maskVariant=&facialHairProbability=50&headVariant=dreads2,flatTop,flatTopLong,grayShort,hatBeanie,hatHip,mohawk,mohawk2,noHair1,noHair2,noHair3,pomp,shaved2,shaved3,short1,short2,short3,short4,short5,turban,twists,twists2&facialHairVariant=chin,full,full2,full3,full4,goatee1,goatee2,moustache1,moustache2,moustache3,moustache5,moustache6,moustache7,moustache9&seed=" 
   

    const femaleHappyUrl =
      "https://api.dicebear.com/10.x/open-peeps/svg?skinColor=49694a&clothingColor=a2eaa2&headContrastColor=75a975&inkColor=a2eaa2&maskProbability=0&expressionVariant=blank,calm,cheeky,cute,driven,eatingHappy,eyesClosed,old,smile&backgroundColor=000000&accessoriesVariant=eyepatch,glasses,glasses2,glasses3,glasses5,sunglasses,sunglasses2&maskVariant=&facialHairProbability=0&headVariant=afro,bangs,bangs2,bantuKnots,bun,bun2,buns,cornrows,cornrows2,dreads1,grayBun,grayMedium,long,longAfro,longBangs,longCurly,medium1,medium2,medium3,mediumBangs,mediumBangs2,mediumBangs3,mediumStraight,shaved1&facialHairVariant=&seed=" 
    
    const femaleAngryUrl =
      "https://api.dicebear.com/10.x/open-peeps/svg?skinColor=49694a&clothingColor=a2eaa2&headContrastColor=75a975&inkColor=a2eaa2&maskProbability=0&expressionVariant=angryWithFang,serious,solemn,suspicious,tired,veryAngry&backgroundColor=000000&accessoriesVariant=eyepatch,glasses,glasses2,glasses3,glasses5,sunglasses,sunglasses2&maskVariant=&facialHairProbability=0&headVariant=afro,bangs,bangs2,bantuKnots,bun,bun2,buns,cornrows,cornrows2,dreads1,grayBun,grayMedium,long,longAfro,longBangs,longCurly,medium1,medium2,medium3,mediumBangs,mediumBangs2,mediumBangs3,mediumStraight,shaved1&facialHairVariant=&seed=" 
     
    const femaleNeutralUrl =
      "https://api.dicebear.com/10.x/open-peeps/svg?skinColor=49694a&clothingColor=a2eaa2&headContrastColor=75a975&inkColor=a2eaa2&maskProbability=0&expressionVariant=blank,eyesClosed&backgroundColor=000000&accessoriesVariant=eyepatch,glasses,glasses2,glasses3,glasses5,sunglasses,sunglasses2&maskVariant=&facialHairProbability=0&headVariant=afro,bangs,bangs2,bantuKnots,bun,bun2,buns,cornrows,cornrows2,dreads1,grayBun,grayMedium,long,longAfro,longBangs,longCurly,medium1,medium2,medium3,mediumBangs,mediumBangs2,mediumBangs3,mediumStraight,shaved1&facialHairVariant=&seed=" 
  

    const synthHappyUrl =
      "https://api.dicebear.com/10.x/open-peeps/svg?skinColor=49694a&clothingColor=a2eaa2&headContrastColor=75a975&inkColor=a2eaa2&maskProbability=0&expressionVariant=blank,calm,cheeky,cute,driven,eatingHappy,eyesClosed,old,smile&backgroundColor=000000&accessoriesVariant=eyepatch,glasses,glasses2,glasses3,glasses5,sunglasses,sunglasses2&seed=" 
  
    const synthAngryUrl =
      "https://api.dicebear.com/10.x/open-peeps/svg?skinColor=49694a&clothingColor=a2eaa2&headContrastColor=75a975&inkColor=a2eaa2&maskProbability=0&expressionVariant=angryWithFang,serious,solemn,suspicious,tired,veryAngry&backgroundColor=000000&accessoriesVariant=eyepatch,glasses,glasses2,glasses3,glasses5,sunglasses,sunglasses2&seed=" 
   
    const synthNeutralUrl =
      "https://api.dicebear.com/10.x/open-peeps/svg?skinColor=49694a&clothingColor=a2eaa2&headContrastColor=75a975&inkColor=a2eaa2&maskProbability=0&expressionVariant=blank,eyesClosed&backgroundColor=000000&accessoriesVariant=eyepatch,glasses,glasses2,glasses3,glasses5,sunglasses,sunglasses2&seed=" 
    

    if (gender === "male") {
      if (behaviour.toLowerCase() === "compliant") {
        imageUrl = mensHappyUrl +uuidv4();
      } else if (behaviour.toLowerCase() === "non-compliant") {
        imageUrl = mensAngryUrl +uuidv4();
      } else {
        imageUrl = mensNeutralUrl +uuidv4();
      }
    } else if (gender === "female") {
      if (behaviour.toLowerCase() === "compliant") {
        imageUrl = femaleHappyUrl +uuidv4();
      } else if (behaviour.toLowerCase() === "non-compliant") {
        imageUrl = femaleAngryUrl +uuidv4();
      } else {
        imageUrl = femaleNeutralUrl +uuidv4();
      }
    } else {
      if (behaviour.toLowerCase() === "compliant") {
        imageUrl = synthHappyUrl +uuidv4();
      } else if (behaviour.toLowerCase() === "non-compliant") {
        imageUrl = synthAngryUrl +uuidv4();
      } else {
        imageUrl = synthNeutralUrl +uuidv4();
      }
    }

    return imageUrl;
  }
}
