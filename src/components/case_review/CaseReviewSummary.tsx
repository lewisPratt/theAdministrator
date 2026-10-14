import type { summaryProps } from "../../interfaces/interfaces";

export default function CaseReviewSummary({
  efficiency,
  interviewCount,
  startNewShift,
  reviewsCompleteSetter
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
//close overlay when overlay is clicked.
  function closeOverlay(e: React.MouseEvent<HTMLDivElement>) {
    const clickedTarget = e.target as HTMLDivElement;
    if (clickedTarget.id === "review-overlay") {
      reviewsCompleteSetter(true)
    }
  }

  return (
    <div id="review-overlay" className="review-overlay" onClick={(e)=>closeOverlay(e)}>
      <div id="summary-container">
        <h3>Shift complete.</h3>
        <p>
          You reviewed {interviewCount} interviews, working at {efficiency}%
          efficiency.
        </p>
        <p>{efficiencyText}</p>
        <button onClick={()=>{startNewShift('new')}}>Start next shift</button>
        <button onClick={()=>{startNewShift('end')}}>Visit Upgrade Terminal</button>
      </div>
    </div>
  );
}
