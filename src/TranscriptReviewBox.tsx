import type { Dispatch, SetStateAction } from "react";
import type { reviewShape } from "./interfaces";
import { Map, DoorOpen, Backpack,CircleCheck, CircleX} from "lucide-react";
import { Tooltip } from 'react-tooltip'


interface transcriptReviewBoxProps {
  transcript: reviewShape | null;
  reviewTranscriptSetter: Dispatch<SetStateAction<reviewShape | null>>;
}

export default function TranscriptReviewBox({
  transcript,
  reviewTranscriptSetter,
}: transcriptReviewBoxProps) {
  console.log(transcript);
  return (
    <>
    {transcript &&
    <div className="transcript-container">
      <h3>{transcript.interviewee}</h3>
      <div className="interviewee-details">
        <p>Occupation: {transcript.occupation.name} </p>
        <p>Age: {transcript.age}</p>
        <p>Interview Location: {transcript.location.name}</p>
        <p>Interview District: {transcript.location.district} - Occupation District: {transcript.occupation.district} Weighting: {transcript.overallWeighting}</p>
        <p>{transcript.weightingArray.map((item)=>{
            return <> {item} |</>
        })}</p>
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

              return <div className="badge" data-tooltip-id="item-desc" data-tooltip-content={item.description}>{item.itemComponent}</div>;
            })}
          </div>
          <Tooltip id="item-desc"></Tooltip>
        </div>
      </div>
      <div
        id="transcript-close-button"
        onClick={() => reviewTranscriptSetter(null)}
      >
        Close
      </div>
    </div>
}
</>
  );
}
