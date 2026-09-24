import type { reviewShape, transcriptListItemProps } from "../interfaces/interfaces";



export default function TranscriptListItem({
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
    <li
      className={(identifier === currentTranscript.identifier ? "current-selected-item": "") + " " + (currentTranscript.processed && !currentTranscript.decisionOutcome ? "negative-processed-item" :"")+" transcript-list-item "+ (currentTranscript.processed && currentTranscript.decisionOutcome ? "positive-processed-item":"" ) }
      key={currentTranscript.interviewee.firstName + currentTranscript.age}
      onClick={() => openTranscript(currentTranscript)}
    >
      <span>{currentTranscript.interviewee.firstName[0]}. {currentTranscript.interviewee.lastName}</span>
      <span>{currentTranscript.occupation.name}</span>
    </li>}
    </>
  );
}
