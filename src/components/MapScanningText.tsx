import { useEffect, useState } from "react";
/**
 * Component that randomly determines whether to display "violation detected" text element within CityMap component.
 * @summary Randomly decides whether or not to show the text using an interval timer, then resets the text state to hide it using a timeout.
 * @return {JSX.IntrinsicElements.text: SVGTextElementAttributes<SVGTextElement>} Conditionally returns the SVG text element containing the "violation detected" text or an empty tag
 */

export default function MapScanningText() {
  const [scanned, setScanned] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      performScan();
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const resetInterval = setTimeout(() => {
      setScanned(false);
    }, 2000);

    return () => clearInterval(resetInterval);
  }, [scanned]);

/** 
* Sets state (randomly) to determine the conditional display of the violation text. 
*/
  function performScan() {
    if (Math.floor(Math.random() * 10) + 1 < 8) {
      setScanned(true);
    }
  }

  return (
    <>
      {scanned && (
        <text className="small-city-string" id="violation-text" y="80">
          &gt;&gt; Violation detected. Sending detainment team.
        </text>
      )}
    </>
  );
}
