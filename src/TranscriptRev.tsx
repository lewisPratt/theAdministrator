import { useState, type Dispatch, type SetStateAction } from "react";
import TranscriptReviewBox from "./TranscriptReviewBox";
import TranscriptListItem from "./TranscriptListItem";
import type { carryableItemsShape, reviewShape } from "./interfaces";
import { createName } from "./NameArrays";
import { createItems } from "./CarryableItems";
 
interface transcriptRevProps {
  adminNameSetter: Dispatch<SetStateAction<string | null>>;
  transcriptRevSetter: Dispatch<SetStateAction<boolean>>;
}
class person {
  interviewee: string;
  items: carryableItemsShape[];
  age: number;
  location: string;
  recreationPass: boolean;
  locationIdent: number[];
  occupation: string;
  constructor() {
    this.interviewee = createName();
    this.items = createItems();
    this.age = 20;
    this.location = "here";
    this.recreationPass = true;
    this.locationIdent = [1, 23, 4];
    this.occupation = "unemployed";
  }
}

let transcriptsArray: reviewShape[] = [];

for (let index = 0; index < Math.random() * 10; index++) {
  const newPerson = new person();
  transcriptsArray.push(newPerson);
}

export default function TranscriptRev({
  adminNameSetter,
  transcriptRevSetter,
}: transcriptRevProps) {
  const [typedCommand, setTypedCommand] = useState<string>("");
  const [errorState, setErrorState] = useState<boolean>(false);
  const [reviewTranscript, setReviewTranscript] = useState<reviewShape | null>(
    null,
  );

  function handleCommand(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    e.currentTarget.reset();
    switch (typedCommand) {
      case "[Exit]":
        adminNameSetter(null);
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

        {reviewTranscript && (
          <TranscriptReviewBox
            reviewTranscriptSetter={setReviewTranscript}
            transcript={reviewTranscript}
          />
        )}

        <p>Select a transcript from the list below</p>
        <ol id="transcript-list">
          {transcriptsArray.map((listItem) => (
            <TranscriptListItem
              reviewTranscriptSetter={setReviewTranscript}
              transcript={listItem}
            />
          ))}
        </ol>
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
