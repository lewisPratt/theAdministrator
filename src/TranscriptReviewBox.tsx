import type { Dispatch, SetStateAction } from "react";

interface transcriptReviewBoxProps {
  transcript: reviewShape;
  reviewTranscriptSetter: Dispatch<SetStateAction<reviewShape | null>>;
}

interface reviewShape {
  interviewee: string;
  age: number;
  occupation: string;
}
export default function TranscriptReviewBox({
  transcript,
  reviewTranscriptSetter,
}: transcriptReviewBoxProps) {
  return (
    <div className="transcript-container">
      <h3>{transcript.interviewee}</h3>
      <div className="interviewee-details">
        <p>Occupation: {transcript.occupation}</p>
        <p>Age: {transcript.age}</p>
      </div>
      <div className="transcrip[t-text">
        Aute enim voluptate cillum excepteur culpa. Qui proident velit sint
        cillum enim fugiat velit culpa dolor consectetur anim et ea. Lorem id
        Lorem veniam excepteur cupidatat proident fugiat ea dolore. Eiusmod
        consequat proident mollit laboris esse velit.
      </div>
      <div
        id="transcript-close-button"
        onClick={() => reviewTranscriptSetter(null)}
      >
        Close
      </div>
    </div>
  );
}
