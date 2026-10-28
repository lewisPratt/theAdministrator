import { MapPinSearch } from "lucide-react";
import type { reviewShape } from "../../interfaces/interfaces";
import { type Dispatch, type SetStateAction } from "react";

interface citizenAvatarProps {
  transcript: reviewShape;
    cityMapState : boolean
    cityMapSetter: Dispatch<SetStateAction<boolean>>;
}

export default function CitizenAvatar({ transcript, cityMapSetter }: citizenAvatarProps) {
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
      
        <line x1="0"  y1="0" x2="0" y2="160" className="avatar-distort" />
        <line x1="7"  y1="0" x2="7" y2="160" className="avatar-distort" />
        <line x1="14"  y1="0" x2="14" y2="160" className="avatar-distort" />
        <line x1="21"  y1="0" x2="21" y2="160" className="avatar-distort" />
        <line x1="28"  y1="0" x2="28" y2="160" className="avatar-distort" />
        <line x1="35"  y1="0" x2="35" y2="160" className="avatar-distort" />
        <line x1="42"  y1="0" x2="42" y2="160" className="avatar-distort" />
        
        <line x1="49"  y1="0" x2="49" y2="160" className="avatar-distort" />
        <line x1="56"  y1="0" x2="56" y2="160" className="avatar-distort" />
        <line x1="63"  y1="0" x2="63" y2="160" className="avatar-distort" />
        <line x1="70"  y1="0" x2="70" y2="160" className="avatar-distort" />
        <line x1="77"  y1="0" x2="77" y2="160" className="avatar-distort" />
        <line x1="84"  y1="0" x2="84" y2="160" className="avatar-distort" />

        <line x1="91"  y1="0" x2="91" y2="160" className="avatar-distort" />
        <line x1="98"  y1="0" x2="98" y2="160" className="avatar-distort" />
        <line x1="105"  y1="0" x2="105" y2="160" className="avatar-distort" />
        <line x1="112"  y1="0" x2="112" y2="160" className="avatar-distort" />
        <line x1="119"  y1="0" x2="119" y2="160" className="avatar-distort" />
        <line x1="126"  y1="0" x2="126" y2="160" className="avatar-distort" />
        
        <line x1="133"  y1="0" x2="133" y2="160" className="avatar-distort" />
        <line x1="140"  y1="0" x2="140" y2="160" className="avatar-distort" />
        <line x1="147"  y1="0" x2="147" y2="160" className="avatar-distort" />
        <line x1="152"  y1="0" x2="1152" y2="160" className="avatar-distort" />
 

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
