import { Tooltip } from "react-tooltip";

interface ScoreTrackerProps{
scoreState: number
}

export default function ScoreTracker({scoreState}: ScoreTrackerProps) {
    
  return (
    <>
     <p data-tooltip-id='score-tooltip' data-tooltip-content='Credits can be exchanged for recreation time.'>{scoreState} Credits earned.</p>
              <Tooltip id="score-tooltip"></Tooltip>
</>
  )
}
