import { Tooltip } from "react-tooltip";
import type { ScoreTrackerProps } from "../../interfaces/interfaces";
import { CreditIcon } from "../../assets/custom_icons/credits";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CurrentSlugContext } from "../../context_providers/CurrentSlugContext";
export default function ScoreTracker({scoreState}: ScoreTrackerProps) {
  const {setCurrentSlug} = useContext(CurrentSlugContext)
    const navigate = useNavigate()
  return (
    <>
     <button onClick={()=>{navigate("/VoucherShop");setCurrentSlug("nav.voucher")}} className="score-tracker-button" id='score-tracker-desktop' tabIndex={0} data-tooltip-id='score-tooltip' data-tooltip-content='Credits can be exchanged for benefits in the voucher terminal.'><CreditIcon size={18} className="custom-icon" /> {scoreState}</button>
              <Tooltip id="score-tooltip" className='custom-tooltip'></Tooltip>
</>
  )
}
