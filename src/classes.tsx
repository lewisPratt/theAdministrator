import type {
  weatherShape,
  nameShape,
  carryableItemsShape,
  locationsShape,
  occupationsShape,
} from "./interfaces";
import { v4 as uuidv4 } from "uuid";
import { IdCard } from "lucide-react";
import { createName } from "./NameArrays";
import { createItems } from "./CarryableItems";
import { CreateOccupation } from "./OccupationGenerator";
import createLocation from "./LocationGenerator";
import generateWeather from "./WeatherGenerator";
import { generateAuthorizedLocations } from "./AuthorizedLocationGenerator";
import { generateBehaviour } from "./behaviourGenerator";
import { PersonFlavourGenerator } from "./PersonFlavourGenerator";

export class person {
  interviewee: nameShape;
  items: carryableItemsShape[];
  age: number;
  location: locationsShape;
  recreationPass: boolean;
  authorizedLocations: number[];
  occupation: occupationsShape;
  overallWeighting: number;
  weightingArray: string[];
  weather: weatherShape;
  behaviour: string;
  processed: boolean;
  decision: string;
  decisionOutcome: boolean | null;
  personFlavour: string;
  gender: string;
  identifier: string;
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
  }

  generateGender() {
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
  generateRecreationPass(): boolean {
    const grantPass: number = Math.round(Math.random() * 1);
    return grantPass === 1 ? true : false;
  }

  workOutWeighting(): number {
    let weighting = 0;
    let weightingArray: string[] = [];
    this.items.forEach((item) => {
      if (!item.legal) {
        weighting -= 1;
        weightingArray.push("NEGATIVE ITEM");
      } else if (item.legal) {
        // weighting += 1;
        // weightingArray.push("POSITIVE ITEM");
      }
    });
    if (this.recreationPass) {
      weighting += 1;
      weightingArray.push("+ rec pass present");
    }
    //the person is in a lower district than their job role allows (meaning a street vendor shouldn't be in the communications district)
    if (
      this.location.district < this.occupation.district &&
      this.location.district != 5 &&
      !this.authorizedLocations.includes(this.location.district)
    ) {
      weighting -= 1;
      weightingArray.push("- Out of district");
    }
    //if person has no recreation pass and is in the recreation zone (zone 8) they get negative weight
    if (
      !this.recreationPass &&
      this.location.district === 8 &&
      this.occupation.district != 8 &&
      !this.authorizedLocations.includes(8)
    ) {
      weighting -= 1;
      weightingArray.push("- no Rec pass in Rec zone");
    }
    if (this.location.district === this.occupation.district) {
      weighting += 1;
      weightingArray.push("+ interviewed at work");
    }
    if (this.authorizedLocations.includes(this.location.district)) {
      weighting += 1;
      weightingArray.push("+ interviewed in auth loc");
    }
    if (this.behaviour == "Non-compliant") {
      weighting -= 1;
      weightingArray.push("- behaviour");
    } else if (this.behaviour == "Compliant") {
      weighting += 1;
      weightingArray.push("+ behaviour");
    }
    //specific items
    const idCard = this.items.find((thisItem) => {
      return thisItem.itemComponent === <IdCard />;
    });
    if (idCard) {
      weighting += 1;
      weightingArray.push("Id card present");
    }

    this.weightingArray = [...weightingArray];
    return weighting;
  }
}
