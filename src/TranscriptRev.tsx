import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import TranscriptReviewBox from "./TranscriptReviewBox";
import TranscriptListItem from "./TranscriptListItem";
import { v4 as uuidv4 } from "uuid";

import type {
  carryableItemsShape,
  reviewShape,
  locationsShape,
  occupationsShape,
  weatherShape,
  nameShape
} from "./interfaces";
import { createName } from "./NameArrays";
import { createItems } from "./CarryableItems";
import { CreateOccupation } from "./OccupationGenerator";
import createLocation from "./LocationGenerator";
import generateWeather from "./WeatherGenerator";
import { generateAuthorizedLocations } from "./AuthorizedLocationGenerator";
import { generateBehaviour } from "./behaviourGenerator";
import SearchConsole from "./SearchInfo";
import { PersonFlavourGenerator } from "./PersonFlavourGenerator";

import { IdCard } from "lucide-react";
interface transcriptRevProps {
  adminNameSetter: Dispatch<SetStateAction<string | null>>;
  transcriptRevSetter: Dispatch<SetStateAction<boolean>>;
  scoreSetter: Dispatch<SetStateAction<number>>
  scoreState: number
}
class person {
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
  processed: boolean
  decision:string
  decisionOutcome: boolean | null
  personFlavour: string
  gender: string
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
    this.processed = false
    this.decision = ""
    this.decisionOutcome = null
    this.gender = this.generateGender()
    this.personFlavour = PersonFlavourGenerator(this.behaviour, this.weather,this.occupation, this.recreationPass,this.interviewee,this.age, this.location, this.items, this.gender)
  }

  generateGender(){
    const genders = ["male", "female", "male", "female","male", "female","synth","synth" ]
    return genders[Math.floor(Math.random()* genders.length)]
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

export default function TranscriptRev({
  scoreSetter,scoreState,
  transcriptRevSetter,
}: transcriptRevProps) {
  const [typedCommand, setTypedCommand] = useState<string>("");
  const [errorState, setErrorState] = useState<boolean>(false);
  const [availableTranscripts, setAvailableTranscripts] = useState<
    reviewShape[] | null
  >(null);
  const [currentTranscript, setCurrentTranscript] =
    useState<reviewShape | null>(null);
    //triggers re-render even when score is 0 and score updates to 0 (which doesn't rerender)
  const [decisionMade, setDecisionMade] = useState<boolean>(false)

  useEffect(() => {
    let transcriptsArray: reviewShape[] = [];
    const transcriptCount = Math.floor(Math.random() * 10) + 5;
    for (let index = 0; index < transcriptCount; index++) {
      const newPerson = new person();
      transcriptsArray.push(newPerson);
    }
    console.log("generated number of transcripts: ", transcriptCount);
    setAvailableTranscripts(transcriptsArray);
  }, []);
  console.log(availableTranscripts);
  //need to set state review transcripts so they reset when exiting

  function handleCommand(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    e.currentTarget.reset();
    switch (typedCommand) {
      case "[Exit]":
        setAvailableTranscripts(null);
        setCurrentTranscript(null);
        transcriptRevSetter(false);
        setErrorState(false);
        break;
      default:
        setErrorState(true);
        break;
    }
  }

  return (
    <>
      <section id="transcript-review">
        <h2>Transcript Review</h2>
        <p id="reminder-p">
          Reminder: You must complete your designated tasks to qualify for
          'Recreational Time'.
        </p>
         
       
       
       
        <SearchConsole />
        <div id='top-container'>
        {availableTranscripts && (
          <ol id="transcript-list">
            <li id='interviews-list-header'>Available Interviews</li>
            {availableTranscripts.map((listItem) => (
              <TranscriptListItem
                key={listItem.interviewee.firstName + listItem.authorizedLocations}
                reviewTranscriptSetter={setCurrentTranscript}
                currentTranscript={listItem}
              />
            ))}
          </ol>
        )}
            {currentTranscript && (
          <TranscriptReviewBox 
            reviewTranscriptSetter={setCurrentTranscript}
            transcript={currentTranscript}
            scoreSetter={scoreSetter}
            scoreState={scoreState}
            decisionSetter={setDecisionMade}
          />
        )}
        </div>
     
      </section>

      <form onSubmit={handleCommand}>
        {errorState && <p>Command Not recognized.</p>}

        <div id="command-input-container">
          <input
            type="text"
            placeholder="[Command]"
            id="transcript-rev-command"
            name="command"
            autoComplete="off"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTypedCommand(e.currentTarget.value);
            }}
          ></input>
          <button id="login-submit-button">@</button>
        </div>
        <div className="commands-container">
          <div className="command-container">
            <p>Exit.</p> <p>[Exit]</p>
          </div>
          <div className="command-container">
            <p>Available Commands.</p> <p>[Help]</p>
          </div>
        </div>
      </form>
    </>
  );
}
