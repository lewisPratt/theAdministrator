import { useSoundEnabled } from "react-sounds";
import { Volume2, VolumeX } from "lucide-react";

export default function SoundControl() {
  // Must be used within a SoundProvider
  const [enabled, setEnabled] = useSoundEnabled();
  
  return (
    <div id='sound-control'>
    {enabled ? <Volume2 onClick={() => setEnabled(!enabled)} /> : <VolumeX onClick={() => setEnabled(!enabled)} /> }
   </div>
  );
}