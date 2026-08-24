import { useState, type Dispatch, type SetStateAction } from "react";
import TranscriptReviewBox from "./TranscriptReviewBox";
import TranscriptListItem from "./TranscriptListItem";
import type { reviewShape } from "./interfaces";
import { Smartphone, Tablets, PillBottle } from "lucide-react";

interface transcriptRevProps {
  adminNameSetter: Dispatch<SetStateAction<string | null>>;
  transcriptRevSetter: Dispatch<SetStateAction<boolean>>;
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
  const transcripts : reviewShape[]= [
    {
      interviewee: "Damian Ouster",
      age: 20,
      occupation: "Fabricator",
      location: "Banking District",
      recreationPass: false,
      locationIdent: [1,2,3],
      items: [<PillBottle/>, <Smartphone />]
    },
    { interviewee: "Tamara Johnson", age: 18, occupation: "Talk show host", location: "Dive Bar 'The Smoking Barrel'",recreationPass: true, locationIdent: [5,6], items: [<Tablets />,<Smartphone />]},
  ];

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
          <TranscriptReviewBox reviewTranscriptSetter={setReviewTranscript} transcript={reviewTranscript}/>
        )}

        <p>Select a transcript from the list below</p>
        <ol id="transcript-list">
          {transcripts.map((listItem) => (
            <TranscriptListItem reviewTranscriptSetter={setReviewTranscript} transcript={listItem}/>
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
