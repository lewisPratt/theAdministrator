import { MapPinned, MapPinSearch } from "lucide-react";
import type { reviewShape } from "../../interfaces/interfaces";
import type { Dispatch, SetStateAction } from "react";

interface citizenAvatarProps {
  transcript: reviewShape;
    cityMapState : boolean
    cityMapSetter: Dispatch<SetStateAction<boolean>>;
}

export default function CitizenAvatar({ transcript, cityMapSetter, cityMapState }: citizenAvatarProps) {
const scanLineDelay1 = Math.floor(Math.random() * 5)+ 1
const scanLineDelay2 = Math.floor(Math.random() * 5)+ 1

  return (
    <div className="location-avatar-container">
    <div className="interviewee-avatar">
        <svg width="150" height="150" xmlns="http://www.w3.org/2000/svg" role="img">
        <title>Citizen Avatar</title>
        
      <image
      tabIndex={0}
      data-tooltip-id="item-desc"
      data-tooltip-content="Lifelike depiction of Citizen"
        className="avatar"
        href={transcript.avatar}
        
        data-default=""
        onError={(e) => {
          if (e.currentTarget.dataset.default != "set") {
            e.currentTarget.setAttribute("href", "default-avatar.webp");
            e.currentTarget.dataset.default = "set";
          } else {
            if (e.currentTarget.parentElement) {
              e.currentTarget.parentElement.style.cssText =
                "background-color: #a2eaa2;";
            }
            e.currentTarget.before("Avatar Not Found");
           
          }
        }}
      /> 
      
      <line x1="0" cx={50} y1="0" x2="160" y2="0" className="avatar-scan-line" >
        <animateMotion
            path="M -5 0 L 0 150"
            begin={scanLineDelay1}
            dur="4s"
            repeatCount="indefinite" />
        </line>
        <line x1="0" cx={50} y1="0" x2="160" y2="0" className="avatar-scan-line">
        <animateMotion
            path="M -5 0 L 0 150"
            begin={scanLineDelay2}
            dur="5s"
            repeatCount="indefinite" />
        </line>
        <line x1="0" cx={50} y1="0" x2="160" y2="0" stroke="1" className="avatar-scan-line">
        <animateMotion
            path="M -5 0 L 0 150"
            begin={scanLineDelay2}
            dur="6s"
            repeatCount="indefinite" />
        </line>
      </svg>
    </div>
        <button onClick={()=>cityMapSetter(true)} aria-label="View city map" data-tooltip-id="item-desc" data-tooltip-content="View City Map" className="case-map-button"><MapPinSearch  size={18}/></button>
    </div>
  );
}
