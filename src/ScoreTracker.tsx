import { Tooltip } from "react-tooltip";
import type { ScoreTrackerProps } from "./interfaces/interfaces";


export default function ScoreTracker({scoreState}: ScoreTrackerProps) {
    
  return (
    <>
     <p tabIndex={0} data-tooltip-id='score-tooltip' data-tooltip-content='Credits can be exchanged for benefits in the voucher terminal.'>{scoreState} Credits</p>
              <Tooltip id="score-tooltip" className='custom-tooltip'></Tooltip>
</>
  )
}
