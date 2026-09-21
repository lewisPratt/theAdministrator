import { useSoundEnabled } from "react-sounds";
import { Volume2, VolumeX } from "lucide-react";
import { Tooltip } from "react-tooltip";

export default function SoundControl() {
  // Must be used within a SoundProvider
  const [enabled, setEnabled] = useSoundEnabled();

 const soundStatus = enabled ? 'on' : 'off'
  return (
    <>
    <button  id='sound-control' data-tooltip-id='sound-tooltip' data-tooltip-content={'Sound is '+soundStatus} 
     onClick={ enabled ? () => setEnabled(!enabled) : () => setEnabled(!enabled)}
    >

    {enabled ? <Volume2 /> : <VolumeX /> }
        
   </button>
   <Tooltip id='sound-tooltip' className='custom-tooltip'/>
   </>
  );
}