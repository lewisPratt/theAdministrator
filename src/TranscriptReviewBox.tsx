import type { Dispatch, SetStateAction } from "react";
import type { reviewShape } from "./interfaces";
import { Map, DoorOpen, Backpack,CircleCheck, CircleX} from "lucide-react";

interface transcriptReviewBoxProps {
  transcript: reviewShape;
  reviewTranscriptSetter: Dispatch<SetStateAction<reviewShape | null>>;
}

export default function TranscriptReviewBox({
  transcript,
  reviewTranscriptSetter,
}: transcriptReviewBoxProps) {
  console.log(transcript);
  return (
    <div className="transcript-container">
      <h3>{transcript.interviewee}</h3>
      <div className="interviewee-details">
        <p>Occupation: {transcript.occupation}</p>
        <p>Age: {transcript.age}</p>
        <p>Interview Location: {transcript.location}</p>
      </div>
      <div className="transcrip[t-text">
        Aute enim voluptate cillum excepteur culpa. Qui proident velit sint
        cillum enim fugiat velit culpa dolor consectetur anim et ea. Lorem id
        Lorem veniam excepteur cupidatat proident fugiat ea dolore. Eiusmod
        consequat proident mollit laboris esse velit.
      </div>
      <div className="passes-container">
        <div>
          <DoorOpen />
          <div className="recreation-pass-container">
            <div className="recreation-pass badge">
              {transcript.recreationPass ? <p><CircleCheck /></p> : <p><CircleX /></p>}
            </div>
          </div>
        </div>
        <div>
          <Map />
          <div className="location-pass-container ">
            {transcript.locationIdent.map((loc) => {
              return <div className="badge">{loc}</div>;
            })}
          </div>
        </div>
        <div>
          <Backpack />
          <div className="location-pass-container ">
            {transcript.items.map((item) => {

              return <div className="badge">{item}</div>;
            })}
          </div>
        </div>
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
