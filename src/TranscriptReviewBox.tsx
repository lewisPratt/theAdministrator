import type { Dispatch, SetStateAction } from "react";
import type { reviewShape } from "./interfaces";
import { Map, DoorOpen, Backpack, CircleCheck, CircleX } from "lucide-react";
import { Tooltip } from "react-tooltip";
import { v4 as uuidv4 } from "uuid";

interface transcriptReviewBoxProps {
  transcript: reviewShape | null;
  reviewTranscriptSetter: Dispatch<SetStateAction<reviewShape | null>>;
  scoreSetter: Dispatch<SetStateAction<number>>;
}
//set to 1 to show debug info on weighting
const debug: number = 0;

export default function TranscriptReviewBox({
  transcript,
  scoreSetter,
  reviewTranscriptSetter,
}: transcriptReviewBoxProps) {
  let recPassDesc: string = "";
  if (transcript?.recreationPass) {
    recPassDesc = "Valid RecPass";
  } else {
    recPassDesc = "No RecPass";
  }

  function handleDecision(e: React.MouseEvent<HTMLDivElement>) {
    if (transcript) {
      const decision = e.currentTarget.dataset.decision;
      const personWeighting = transcript.overallWeighting;

      switch (decision) {
        case 'nfa':
            if(personWeighting < 0){
                //person is bad, negative consequence for wrong decision.
            }else if(personWeighting > 0){
                //person is good, positive consequences for right deision
                
            }else{
                //person is neutral (0) so no negative or positive consequences
            }
          break;
        case 'reeducate':
              if(personWeighting < 0){
                //person is bad, positive consequence for right decision.
            }else if(personWeighting > 0){
                //person is bad, negative consequences for wrong deision
            }else{
                //person is neutral (0) so negative consequence for bad decision 
            }
          break;

        default:
          break;
      }
    }
  }
  return (
    <>
      {transcript && (
        <div className="transcript-container">
          <div
            id="weather-container"
            data-tooltip-id="item-desc"
            data-tooltip-content={transcript.weather.weather}
          >
            {transcript.weather.icon}
          </div>
          <h3>{transcript.interviewee}</h3>
          <div className="interviewee-details">
            <p>Occupation: {transcript.occupation.name} </p>
            <p>Age: {transcript.age}</p>

            <p>Interview Location: {transcript.location.name}</p>
            <p>Behaviour: {transcript.behaviour}</p>

            {debug === 1 && (
              <>
                <p>
                  Interview District: {transcript.location.district} -
                  Occupation District: {transcript.occupation.district}{" "}
                  Weighting: {transcript.overallWeighting}
                </p>
                <p>
                  {transcript.weightingArray.map((item) => {
                    return <span key={uuidv4()}> {item} |</span>;
                  })}
                </p>
              </>
            )}
          </div>

          <div className="transcrip[t-text">
            Aute enim voluptate cillum excepteur culpa. Qui proident velit sint
            cillum enim fugiat velit culpa dolor consectetur anim et ea. Lorem
            id Lorem veniam excepteur cupidatat proident fugiat ea dolore.
            Eiusmod consequat proident mollit laboris esse velit.
          </div>
          <div className="passes-container">
            <div>
              <DoorOpen />
              <div className="recreation-pass-container">
                <div
                  data-tooltip-id="item-desc"
                  data-tooltip-content={recPassDesc}
                  className="recreation-pass badge"
                >
                  {transcript.recreationPass ? (
                    <p>
                      <CircleCheck />
                    </p>
                  ) : (
                    <p>
                      <CircleX />
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div>
              <Map />
              <div className="location-pass-container ">
                {transcript.authorizedLocations.map((loc) => {
                  const tooltipText = "District " + loc;
                  return (
                    <div
                      key={loc}
                      className="badge"
                      data-tooltip-id="item-desc"
                      data-tooltip-content={tooltipText}
                    >
                      {loc}
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <Backpack />
              <div className="location-pass-container ">
                {transcript.items.map((item) => {
                  return (
                    <div
                      className="badge"
                      key={uuidv4()}
                      data-tooltip-id="item-desc"
                      data-tooltip-content={item.description}
                    >
                      {item.itemComponent}
                    </div>
                  );
                })}
              </div>
              <Tooltip id="item-desc"></Tooltip>
            </div>
          </div>
          <div className="decision-container">
            <div data-decision="nfa" onClick={handleDecision}>
              <p>No further action</p>
            </div>
            <div data-decision="reeducate" onClick={handleDecision}>
              <p>Send for re-education</p>
            </div>
          </div>
          <div
            id="transcript-close-button"
            onClick={() => reviewTranscriptSetter(null)}
          >
            Close
          </div>
        </div>
      )}
    </>
  );
}
