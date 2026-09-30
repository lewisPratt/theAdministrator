import { useSoundEnabled } from "react-sounds";
import { Volume2, VolumeX } from "lucide-react";
import { Tooltip } from "react-tooltip";

interface soundControlPorps{
  mobile: boolean
}

export default function SoundControl({mobile}: soundControlPorps) {
  // Must be used within a SoundProvider
  const [enabled, setEnabled] = useSoundEnabled();

 const soundStatus = enabled ? 'on' : 'off'
  return (
    <>
    <button  id='sound-control-desktop' className={(mobile ? 'mobile-nav-element': 'desktop-nav-element')} data-tooltip-id='sound-tooltip' data-tooltip-content={'Sound is '+soundStatus} 
     onClick={ enabled ? () => setEnabled(!enabled) : () => setEnabled(!enabled)}
    ><a id="tutorial-step-4"></a>

    {enabled ? <Volume2 /> : <VolumeX /> }
        
   </button>
   <Tooltip id='sound-tooltip' className='custom-tooltip'/>
   </>
  );
}