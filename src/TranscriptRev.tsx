import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import TranscriptReviewBox from "./TranscriptReviewBox";
import TranscriptListItem from "./TranscriptListItem";
import TranscriptReviewSummary from "./TranscriptReviewSummary";
import { NIL as NIL_UUID } from "uuid";
import { person } from "./classes";
import type { reviewShape, reviewsCompleteShape } from "./interfaces";

import SearchConsole from "./SearchInfo";

import NoCurrentTranscript from "./NoCurrentTranscript";
import DebugTools from "./DebugTools";
import RegulationsCodex from "./RegulationsCodex";
import CodexSidePanel from "./CodexSidePanel";
interface transcriptRevProps {
  adminNameSetter: Dispatch<SetStateAction<string | null>>;
  transcriptRevSetter: Dispatch<SetStateAction<boolean>>;
  scoreSetter: Dispatch<SetStateAction<number>>;
  scoreState: number;
  loadingStateSetter: Dispatch<SetStateAction<boolean>>;
}

export default function TranscriptRev({
  scoreSetter,
  scoreState,
  transcriptRevSetter,
  loadingStateSetter,
}: transcriptRevProps) {
  const [typedCommand, setTypedCommand] = useState<string>("");
  const [errorState, setErrorState] = useState<boolean>(false);
  const [availableTranscripts, setAvailableTranscripts] = useState<
    reviewShape[] | null
  >(null);
  const [currentTranscript, setCurrentTranscript] =
    useState<reviewShape | null>(null);
  //triggers re-render even when score is 0 and score updates to 0 (which doesn't rerender)
  const [_decisionMade, setDecisionMade] = useState<boolean>(false);
  const [reviewsComplete, setReviewsComplete] =
    useState<reviewsCompleteShape | null>(null);
  const [selectedListItem, setSelectedListItem] = useState<string>(NIL_UUID);
  const [generatePeople, setGeneratePeople] = useState<boolean>(false);
  const [codexState, setCodexState] = useState<boolean>(false)
  //////////////////////
  // set debug to 1 to see debug tools
  const debug = 1;
  ///////////////////////////

  if (availableTranscripts != null && !reviewsComplete) {
    let effectiveness: number = 0;
    let reviewObj = { count: 0, negative: 0, positive: 0 };
    availableTranscripts.forEach((transcript) => {
      if (transcript.processed) {
        reviewObj.count += 1;
        if (transcript.decisionOutcome) {
          reviewObj.positive += 1;
        } else {
          reviewObj.negative += 1;
        }
      }
    });
    if (reviewObj.count === availableTranscripts.length) {
      effectiveness = Math.round((reviewObj.positive / reviewObj.count) * 100);

      setReviewsComplete({
        numberComplete: reviewObj.count,
        effectivenessRating: effectiveness,
      });
    }
  }

  useEffect(() => {
    let transcriptsArray: reviewShape[] = [];
    const transcriptCount = Math.floor(Math.random() * 10) + 5;
    for (let index = 0; index < transcriptCount; index++) {
      const newPerson = new person();
      transcriptsArray.push(newPerson);
    }
    setAvailableTranscripts(transcriptsArray);
  }, [generatePeople]);

  function loadNewShift() {
    loadingStateSetter(true);
    setTimeout(startNewShift, 1000);
  }
  function startNewShift() {
    loadingStateSetter(false);
    setAvailableTranscripts(null);
    setReviewsComplete(null);
    setGeneratePeople((prev) => !prev);
  }

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
      <CodexSidePanel codexState={codexState} codexStateSetter={setCodexState} />
      {reviewsComplete && (
        <TranscriptReviewSummary
          efficiency={reviewsComplete.effectivenessRating}
          interviewCount={reviewsComplete.numberComplete}
          startNewShift={loadNewShift}
        />
      )}
      <section id="transcript-review">
        <h2>Transcript Review</h2>
        <p id="reminder-p">
          Reminder: You must complete your designated tasks to qualify for
          'Recreational Time'.
        </p>

        <SearchConsole />

        {debug ? <DebugTools generatePeople={setGeneratePeople} /> : null}
        <div id="top-container">
          {availableTranscripts && (
            <ol id="transcript-list">
              <li id="interviews-list-header">Available Interviews</li>
              {availableTranscripts.map((listItem) => (
                <TranscriptListItem
                  key={
                    listItem.interviewee.firstName +
                    listItem.authorizedLocations
                  }
                  reviewTranscriptSetter={setCurrentTranscript}
                  currentTranscript={listItem}
                  identifier={selectedListItem}
                  selectedSetter={setSelectedListItem}
                />
              ))}
              <li id='codex-button' onClick={()=>{setCodexState(true)}}>Regulatory Codex</li>
            </ol>
          )}
          {currentTranscript ? (
            <TranscriptReviewBox
              reviewTranscriptSetter={setCurrentTranscript}
              transcript={currentTranscript}
              scoreSetter={scoreSetter}
              scoreState={scoreState}
              decisionSetter={setDecisionMade}
              selectedSetter={setSelectedListItem}
            />
          ) : (
            <NoCurrentTranscript />
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
