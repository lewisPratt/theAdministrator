import { MapPinned, MapPinSearch } from "lucide-react";
import type { reviewShape } from "../../interfaces/interfaces";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

interface citizenAvatarProps {
  transcript: reviewShape;
    cityMapState : boolean
    cityMapSetter: Dispatch<SetStateAction<boolean>>;
}

export default function CitizenAvatar({ transcript, cityMapSetter, cityMapState }: citizenAvatarProps) {
const scanLineDuration = 10

  return (
    <div className="location-avatar-container">
    <div className="interviewee-avatar">
        <svg width="150" height="150" xmlns="http://www.w3.org/2000/svg" role="img">
        <title>Citizen Avatar</title>

        <filter id='image-overlay' x='0%' y='0%' width='100%' height='100%'>
            <feTurbulence baseFrequency="0.3" />
            <feBlend result="mergedImg" in="SourceGraphic" mode="multiply" />
        </filter>
        <filter id="uniform-noise">
    
    <feTurbulence type="fractalNoise" baseFrequency="0.4" numOctaves="3" stitchTiles="stitch" />
    
   
    <feColorMatrix type="saturate" values="0" />
                <feBlend result="mergedImg" in="SourceGraphic" mode="multiply" />

  </filter>
      
        
      <image
    //   filter="url(#pixelate)"
        
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
      
        <line x1="0"  y1="-180" x2="160" y2="-180" className="avatar-scan-line">
        <animateMotion
            path="M -5 0 L 0 180"
            dur={scanLineDuration}
            
            repeatCount="indefinite" />
        </line>
        <line x1="0" y1="-150" x2="160" y2="-150" className="avatar-scan-line">
        <animateMotion
            path="M -5 0 L 0 180"
            dur={scanLineDuration}
          
            repeatCount="indefinite" />
        </line>
        <line x1="0"  y1="-120" x2="160" y2="-120" className="avatar-scan-line">
        <animateMotion
            path="M -5 0 L 0 180"
            dur={scanLineDuration}
           
            repeatCount="indefinite" />
        </line>
        <line x1="0" y1="-90" x2="160" y2="-90" className="avatar-scan-line" >
        <animateMotion
            path="M -5 0 L 0 180"
            dur={scanLineDuration}
            
            repeatCount="indefinite" />
        </line>
      <line x1="0"  y1="-60" x2="160" y2="-60" className="avatar-scan-line">
        <animateMotion
            path="M -5 0 L 0 180"
            dur={scanLineDuration}
            
            repeatCount="indefinite" />
        </line>
        <line x1="0"  y1="-30" x2="160" y2="-30" className="avatar-scan-line">
        <animateMotion
            path="M -5 0 L 0 180"
            dur={scanLineDuration}
           
            repeatCount="indefinite" />
        </line>
        <line x1="0" y1="0" x2="160" y2="0" className="avatar-scan-line">
        <animateMotion
            path="M -5 0 L 0 180"
            dur={scanLineDuration}
            
            repeatCount="indefinite" />
        </line>
        <line x1="0"  y1="30" x2="160" y2="30" className="avatar-scan-line" >
        <animateMotion
            path="M -5 0 L 0 180"
            dur={scanLineDuration}
         
            repeatCount="indefinite" />
        </line>
        <line x1="0" y1="60" x2="160" y2="60" className="avatar-scan-line" >
        <animateMotion
            path="M -5 0 L 0 180"
            dur={scanLineDuration}
            
            repeatCount="indefinite" />
        </line>
        <line x1="0" y1="90" x2="160" y2="90" className="avatar-scan-line" >
        <animateMotion
            path="M -5 0 L 0 180"
            dur={scanLineDuration}
           
            repeatCount="indefinite" />
        </line>
        <line x1="0" y1="120" x2="160" y2="120" className="avatar-scan-line" >
        <animateMotion
            path="M -5 0 L 0 180"
            dur={scanLineDuration}
           
            repeatCount="indefinite" />
        </line>
         <line x1="0" y1="150" x2="160" y2="150" className="avatar-scan-line" >
        <animateMotion
            path="M -5 0 L 0 180"
            dur={scanLineDuration}
            
            repeatCount="indefinite" />
        </line>
         <line x1="0" y1="180" x2="160" y2="180" className="avatar-scan-line" >
        <animateMotion
            path="M -5 0 L 0 180"
            dur={scanLineDuration}
         
            repeatCount="indefinite" />
        </line>
        
      </svg>
    </div>
        <button onClick={()=>cityMapSetter(true)} aria-label="View city map" data-tooltip-id="item-desc" data-tooltip-content="View City Map" className="case-map-button"><MapPinSearch  size={18}/></button>
    </div>
  );
}
