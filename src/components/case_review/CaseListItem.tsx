import type { reviewShape, transcriptListItemProps } from "../../interfaces/interfaces";
import {FolderTree } from "lucide-react";

export default function CaseListItem({
  currentTranscript,
  reviewTranscriptSetter,selectedSetter,
  identifier
}: transcriptListItemProps) {
    
  function openTranscript(transcript: reviewShape) {
    selectedSetter(transcript.identifier)
    reviewTranscriptSetter(transcript);
  }
 
  return (
    <>
    {currentTranscript &&
    <button
      className={(currentTranscript.bonusCase ? "bonus-case ":"")+(identifier === currentTranscript.identifier ? "current-selected-item ": "") + (currentTranscript.processed && !currentTranscript.decisionOutcome ? "negative-processed-item" :"")+" transcript-list-item "+ (currentTranscript.processed && currentTranscript.decisionOutcome ? "positive-processed-item":"" ) }
      key={currentTranscript.interviewee.firstName + currentTranscript.age}
      onClick={() => openTranscript(currentTranscript)}
    >
      <span>{currentTranscript.interviewee.firstName[0]}. {currentTranscript.interviewee.lastName}</span>  -  
      <span>{currentTranscript.occupation.name.slice(0,10)}</span>
      <span>{currentTranscript.bonusCase === true ? <FolderTree data-tooltip-id="extra-case-tooltip" data-tooltip-content="Bonus case from perk." /> : ""}</span>
    </button>}
    </>
  );
}
