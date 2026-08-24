import type { Dispatch, SetStateAction } from "react";
import type { reviewShape } from "./interfaces";

interface transcriptListItemProps {
  transcript: reviewShape;
  reviewTranscriptSetter: Dispatch<SetStateAction<reviewShape | null>>;
}




export default function TranscriptListItem({
  transcript,reviewTranscriptSetter
}: transcriptListItemProps) {

function openTranscript(transcript: reviewShape) {
  reviewTranscriptSetter(transcript);
}

  return (
    <li
      className="transcript-list-item"
      key={transcript.interviewee + transcript.age}
      onClick={() => openTranscript(transcript)}
    >
      <span>{transcript.interviewee}</span>
      <span>{transcript.occupation}</span>
    </li>
  );
}
