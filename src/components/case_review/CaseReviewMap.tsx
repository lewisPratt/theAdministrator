import { X } from "lucide-react";
import CityMap from "../login/CityMap";
import type { Dispatch, SetStateAction } from "react";

interface caseReviewMapProps {
  cityMapState: boolean;
  cityMapSetter: Dispatch<SetStateAction<boolean>>;
}

export default function CaseReviewMap({cityMapSetter, cityMapState}:caseReviewMapProps) {
  return (
    <div className="city-map-overlay">
      <div className="case-review-map-container">
        <CityMap giveDetails={true}/>
        <button onClick={()=>cityMapSetter(false)} aria-label="Close map">
          <X />
        </button>
      </div>
    </div>
  );
}
