import { MapPinned, MapPinSearch } from "lucide-react";
import type { reviewShape } from "../../interfaces/interfaces";
import type { Dispatch, SetStateAction } from "react";

interface citizenAvatarProps {
  transcript: reviewShape;
    cityMapState : boolean
    cityMapSetter: Dispatch<SetStateAction<boolean>>;
}

export default function CitizenAvatar({ transcript, cityMapSetter, cityMapState }: citizenAvatarProps) {
  return (
    <div className="location-avatar-container">
    <div className="interviewee-avatar">
      <img
      tabIndex={0}
      data-tooltip-id="item-desc"
      data-tooltip-content="Lifelike depiction of Citizen"
        className="avatar"
        src={transcript.avatar}
        alt="Anonymized Citizen Avatar"
        data-default=""
        onError={(e) => {
          if (e.currentTarget.dataset.default != "set") {
            e.currentTarget.src = "default-avatar.webp";
            e.currentTarget.dataset.default = "set";
          } else {
            if (e.currentTarget.parentElement) {
              e.currentTarget.parentElement.style.cssText =
                "background-color: #a2eaa2;";
            }
            e.currentTarget.before("Avatar Not Found");
            e.currentTarget.alt = "";
          }
        }}
      />
    </div>
        <button onClick={()=>cityMapSetter(true)} aria-label="View city map" data-tooltip-id="item-desc" data-tooltip-content="View City Map" className="case-map-button"><MapPinSearch  size={18}/></button>
    </div>
  );
}
