import type { reviewShape } from "../../interfaces/interfaces";
import { v4 as uuidv4 } from "uuid";


interface evidenceStackprops{
    caseDetails: reviewShape
}


export default function EvidenceStack({caseDetails}: evidenceStackprops) {
  return (
    <div id="evidence-box">
      <div className="window-header">
        <h5>Evidence Stack</h5>
      </div>
      <ol>
        <h6>Positive</h6>
        {caseDetails.weightingArray.map((item) => {
          if (item.weighting) {
            return <li key={uuidv4()}> {item.evidenceText} </li>;
          }
        })}
      </ol>
      <ol>
        <h6>Negative</h6>
        {caseDetails.weightingArray.map((item) => {
          if (!item.weighting) {
            return <li key={uuidv4()}> {item.evidenceText} </li>;
          }
        })}
      </ol>
    </div>
  );
}
