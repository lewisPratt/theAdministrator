import type { Dispatch, SetStateAction } from "react";
import type { reviewsCompleteShape, reviewShape } from "./interfaces";

interface summaryProps {
  efficiency: number;
  interviewCount: number;
  targetState:boolean
  startNewShift:(reason:string)=> void
}
export default function TranscriptReviewSummary({
  efficiency,
  interviewCount,
  targetState,
  startNewShift,
}: summaryProps) {
  let efficiencyText: string = "";
  if (efficiency < 20)
    efficiencyText =
      "Significant improvement required or you may be at risk of Re-education.";
  else if (efficiency < 50)
    efficiencyText = "Improvement required, speak with your supervisor.";
  else if (efficiency < 70) efficiencyText = "Adequate performance completed.";
  else if (efficiency < 90) efficiencyText = "Notable performance completed.";
  else if (efficiency < 100)
    efficiencyText =
      "Exemplary performance. You may be eligible for an Ice Cream Party.";
  else if (efficiency === 100)
    efficiencyText =
      "Congratulations! An Ice Cream Party has been scheduled for " +
      Math.floor(Math.random() * 400) +
      1;


  return (
    <div className="review-overlay">
      <div id="summary-container">
        <h3>Shift complete.</h3>
        <p>
          You reviewed {interviewCount} interviews, working at {efficiency}%
          efficiency.
        </p>
        <p>{efficiencyText}</p>
        <button onClick={()=>{startNewShift('new')}}>Start next shift designation</button>
        {targetState && <button onClick={()=>{startNewShift('end')}}>Visit recreation voucher shop</button>}
      </div>
    </div>
  );
}
