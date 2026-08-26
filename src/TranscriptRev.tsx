import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import TranscriptReviewBox from "./TranscriptReviewBox";
import TranscriptListItem from "./TranscriptListItem";
import type {
  carryableItemsShape,
  reviewShape,
  locationsShape,
  occupationsShape,
  weatherShape,
} from "./interfaces";
import { createName } from "./NameArrays";
import { createItems } from "./CarryableItems";
import { CreateOccupation } from "./OccupationGenerator";
import createLocation from "./LocationGenerator";
import generateWeather from "./WeatherGenerator";
import { generateAuthorizedLocations } from "./AuthorizedLocationGenerator";
import { generateBehaviour } from "./behaviourGenerator";
import SearchConsole from "./SearchInfo";

import { IdCard } from "lucide-react";
interface transcriptRevProps {
  adminNameSetter: Dispatch<SetStateAction<string | null>>;
  transcriptRevSetter: Dispatch<SetStateAction<boolean>>;
  scoreSetter: Dispatch<SetStateAction<number>>
  scoreState: number
}
class person {
  interviewee: string;
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
  constructor() {
    this.interviewee = createName();
    this.items = createItems();
    this.age = 20;
    this.location = createLocation();
    this.recreationPass = this.generateRecreationPass();
    this.authorizedLocations = generateAuthorizedLocations();
    this.occupation = CreateOccupation();
    this.weightingArray = [];
    this.weather = generateWeather();
    this.behaviour = generateBehaviour();
    this.overallWeighting = this.workOutWeighting();
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

        {availableTranscripts && (
          <TranscriptReviewBox
            reviewTranscriptSetter={setCurrentTranscript}
            transcript={currentTranscript}
            scoreSetter={scoreSetter}
            scoreState={scoreState}
          />
        )}
        <SearchConsole />
        <p>Select a transcript from the list below</p>
        {availableTranscripts && (
          <ol id="transcript-list">
            {availableTranscripts.map((listItem) => (
              <TranscriptListItem
                key={listItem.interviewee + listItem.authorizedLocations}
                reviewTranscriptSetter={setCurrentTranscript}
                currentTranscript={listItem}
              />
            ))}
          </ol>
        )}
      </section>

      <form onSubmit={handleCommand}>
        {errorState && <p>Command Not recognized.</p>}

        <div id="command-input-container">
          <input
            type="text"
            placeholder="[Command]"
            id="command"
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
