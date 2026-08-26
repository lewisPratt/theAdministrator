import { Tooltip } from "react-tooltip";

interface ScoreTrackerProps{
scoreState: number
}

export default function ScoreTracker({scoreState}: ScoreTrackerProps) {
    
  return (
    <>
     <p data-tooltip-id='score-tooltip' data-tooltip-content='WPs (Work Points) can be exchanged for recreation time.'>{scoreState} WPs earned.</p>
              <Tooltip id="score-tooltip"></Tooltip>
</>
  )
}
