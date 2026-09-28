import { Tooltip } from "react-tooltip";
import type { ScoreTrackerProps } from "../interfaces/interfaces";
import { CreditIcon } from "../assets/custom_icons/credits";

export default function ScoreTracker({scoreState}: ScoreTrackerProps) {
    
  return (
    <>
     <p id='score-tracker-desktop' tabIndex={0} data-tooltip-id='score-tooltip' data-tooltip-content='Credits can be exchanged for benefits in the voucher terminal.'><CreditIcon size={18} className="custom-icon" /> {scoreState}</p>
              <Tooltip id="score-tooltip" className='custom-tooltip'></Tooltip>
</>
  )
}
