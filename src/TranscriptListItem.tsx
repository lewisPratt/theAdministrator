import type { Dispatch, SetStateAction } from "react";
import type { reviewShape } from "./interfaces";

interface transcriptListItemProps {
  currentTranscript: reviewShape | null;
  reviewTranscriptSetter: Dispatch<SetStateAction<reviewShape | null>>;
}

export default function TranscriptListItem({
  currentTranscript,
  reviewTranscriptSetter,
}: transcriptListItemProps) {
    
  function openTranscript(transcript: reviewShape) {
    
    reviewTranscriptSetter(transcript);
  }
 
  return (
    <>
    {currentTranscript &&
    <li
      className={(currentTranscript.processed && !currentTranscript.decisionOutcome && "negative-processed-item" )+" transcript-list-item "+ (currentTranscript.processed && currentTranscript.decisionOutcome && "positive-processed-item" ) }
      key={currentTranscript.interviewee.firstName + currentTranscript.age}
      onClick={() => openTranscript(currentTranscript)}
    >
      <span>{currentTranscript.interviewee.firstName[0]}. {currentTranscript.interviewee.lastName}</span>
      <span>{currentTranscript.occupation.name}</span>
    </li>}
    </>
  );
}
