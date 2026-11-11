import type { reviewShape } from "../../interfaces/interfaces";
import { v4 as uuidv4 } from "uuid";


interface evidenceStackprops{
    caseDetails: reviewShape
}


export default function EvidenceStack({caseDetails}: evidenceStackprops) {
  return (
    <div id="evidence-box">
      
        <hr />
        <h4>Positive</h4>
        <hr />
        <ol>
        {caseDetails.weightingArray.map((item) => {
          if (item.weighting) {
            return <li key={uuidv4()}> {item.evidenceText} </li>;
          }
        })}
      </ol>
      <hr />
        <h4>Negative</h4>
        <hr />
        <ol>
        {caseDetails.weightingArray.map((item) => {
          if (!item.weighting) {
            return <li key={uuidv4()}> {item.evidenceText} </li>;
          }
        })}
      </ol>
    </div>
  );
}
