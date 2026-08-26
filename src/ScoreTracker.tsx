interface ScoreTrackerProps{
scoreState: number
}

export default function ScoreTracker({scoreState}: ScoreTrackerProps) {
  return <p>{scoreState} minutes earned.</p>;
}
