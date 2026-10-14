import type { reviewShape, transcriptListItemProps } from "../../interfaces/interfaces";
import {FolderTree, User } from "lucide-react";

export default function CaseListItem({
  currentTranscript,
  reviewTranscriptSetter,selectedSetter,
  identifier,
  codexState,
  nextCaseSetter,
  currentOpenCase,
  codexStateSetter
}: transcriptListItemProps) {
    
  function openTranscript(transcript: reviewShape) {
    if(codexState){
      codexStateSetter(false)
    }
    console.log(currentTranscript)
    if(currentOpenCase === null){
      selectedSetter(transcript.identifier)
      reviewTranscriptSetter(transcript);
      nextCaseSetter(transcript)
    }else{
    nextCaseSetter(transcript)
    }
  }
 
  return (
    <>
    {currentTranscript &&
    <button
    aria-label="Open case details"
      className={(currentTranscript.bonusCase ? "bonus-case ":"")+(identifier === currentTranscript.identifier ? "current-selected-item ": "") + (currentTranscript.processed && !currentTranscript.decisionOutcome ? "negative-processed-item" :"")+" transcript-list-item "+ (currentTranscript.processed && currentTranscript.decisionOutcome ? "positive-processed-item":"" ) }
      key={currentTranscript.interviewee.firstName + currentTranscript.age}
      onClick={() => openTranscript(currentTranscript)}
    >
      <div className="mobile-case-element"><span><User /></span></div>
      <div className="desktop-case-element">
      <span >{currentTranscript.interviewee.firstName[0]}. {currentTranscript.interviewee.lastName}</span>  -  
      <span >{currentTranscript.occupation.name.slice(0,10)}...</span>
      <span >{currentTranscript.bonusCase === true ? <FolderTree data-tooltip-id="extra-case-tooltip" data-tooltip-content="Bonus case from perk." /> : ""}</span>
    </div>
    </button>}
    </>
  );
}
