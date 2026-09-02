import { useContext, useEffect, useState } from "react";
import TranscriptReviewBox from "./TranscriptReviewBox";
import TranscriptListItem from "./TranscriptListItem";
import TranscriptReviewSummary from "./TranscriptReviewSummary";
import { NIL as NIL_UUID } from "uuid";
import { person } from "./classes";
import type { reviewShape, reviewsCompleteShape,scoreContextShape } from "./interfaces";
import {useNavigate } from "react-router-dom";
import SearchConsole from "./SearchInfo";
import { LoaderCircle } from "lucide-react";
import NoCurrentTranscript from "./NoCurrentTranscript";
import DebugTools from "./DebugTools";
import CodexSidePanel from "./CodexSidePanel";
import { ScoreContext } from "./context_providers/ScoreContext";


export default function TranscriptRev() {
  const [typedCommand, setTypedCommand] = useState<string>("");
  const [errorState, setErrorState] = useState<boolean>(false);
  const [availableTranscripts, setAvailableTranscripts] = useState<
    reviewShape[] | null>(null);
  const [currentTranscript, setCurrentTranscript] =
    useState<reviewShape | null>(null);
  //triggers re-render even when score is 0 and score updates to 0 (which doesn't rerender)
  const [_decisionMade, setDecisionMade] = useState<boolean>(false);
  const [reviewsComplete, setReviewsComplete] =
    useState<reviewsCompleteShape | null>(null);
  const [selectedListItem, setSelectedListItem] = useState<string>(NIL_UUID);
  const [generatePeople, setGeneratePeople] = useState<boolean>(false);
  const [codexState, setCodexState] = useState<boolean>(false)
  const [targetState, setTargetState] = useState<boolean>(false)
  const [loadingState, setLoadingState] = useState<boolean>(true)
  const {scoreState, setScoreState} :scoreContextShape = useContext(ScoreContext)
  const navigate = useNavigate()
  //////////////////////
  // set debug to 1 to see debug tools
  const debug = 0;
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
    //all avaialble transcripts have been processed
    if (reviewObj.count === availableTranscripts.length) {
      effectiveness = Math.round((reviewObj.positive / reviewObj.count) * 100);
       if(scoreState >= 200){setTargetState(true)}

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
        setTimeout(setLoadingState, 2000, false);

  }, [generatePeople]);

  function loadNewShift(reason:string) {
    // loadingStateSetter(true);
    if(reason === 'new'){
        setLoadingState(true)
    setTimeout(startNewShift, 1000);
    }
    else if(reason === 'end'){
    setTimeout(endShift, 1000);
    }
  }
  function startNewShift() {
    setLoadingState(false);
    setAvailableTranscripts(null);
    setReviewsComplete(null);
    setCurrentTranscript(null)
    setGeneratePeople((prev) => !prev);
  }
  function endShift(){
    //need to workout loop for end of shift
    navigate("/voucher-shop")
  }
  function handleCommand(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
   
    switch (typedCommand) {
      case "[Exit]":
        setAvailableTranscripts(null);
        setCurrentTranscript(null);
        // transcriptRevSetter(false);
        navigate('/CommandCentre')
        setErrorState(false);
        break;
      default:
         e.currentTarget.reset();
        setErrorState(true);
        break;
    }
  }
  return (
     <>
      {loadingState ? (
        <p>
          <LoaderCircle className="loader" />
        </p>
      ) : (
        <>
      <CodexSidePanel codexState={codexState} codexStateSetter={setCodexState} />
      
      {reviewsComplete && (
        <TranscriptReviewSummary
          efficiency={reviewsComplete.effectivenessRating}
          interviewCount={reviewsComplete.numberComplete}
          startNewShift={loadNewShift}
          targetState={targetState}
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
              scoreSetter={setScoreState}
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
      
      </>)}
    
</>
)}
