import { X } from "lucide-react";
import CityMap from "../login/CityMap";
import type { Dispatch, SetStateAction } from "react";

interface caseReviewMapProps {
  cityMapState: boolean;
  cityMapSetter: Dispatch<SetStateAction<boolean>>;
}

export default function CaseReviewMap({ cityMapSetter }: caseReviewMapProps) {


    
  //close overlay when overlay is clicked.
  function closeOverlay(e: React.MouseEvent<HTMLDivElement>) {
    const clickedTarget = e.target as HTMLDivElement;
    if (clickedTarget.id === "map-overlay") {
      cityMapSetter(false);
    }
  }
  return (
    <div
      className="city-map-overlay"
      id="map-overlay"
      onClick={(e) => {
        closeOverlay(e);
      }}
    >
      <div className="case-review-map-container">
        <CityMap giveDetails={true} />
        <button onClick={() => cityMapSetter(false)} aria-label="Close map">
          <X />
        </button>
      </div>
    </div>
  );
}
