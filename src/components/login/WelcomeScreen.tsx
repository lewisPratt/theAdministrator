import { useNavigate } from "react-router-dom";
import "../../assets/css/welcome.css"
import { playSound } from "react-sounds";
import boot_up  from '../../assets/sounds/boot_up.mp3'
import { useEffect, useState } from "react";

const welcomeMessages: string[] = [
  "Access granted. Provisionally.",
  "Compliance is required. Excellence is expected.",
  "Decisions here are logged. Judge accordingly.",
  "Quotas are minimums, not achievements.",
  "Authority granted. Accountability is enforced.",
  "Errors are documented, without exception.",
  "Proceed. You are being observed.",
  "Efficiency is the standard, not the goal.",
  "Serve well. The state is watching.",
  "Clearance issued. Clearance may be revoked at any time.",
  "Begin your duties. Your performance will be monitored.",
];

export default function WelcomeScreen() {
  const navigate = useNavigate();
  const [message,] = useState<string>(()=>welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)])
  const handleCustomSound = () => playSound(boot_up, {volume:0.5, loop:false});
    
  useEffect(()=>{
    //trigger login sound from local audio file
    handleCustomSound()
  },[])

  function loginPause() {
    setTimeout(() => navigate("/Terminal"), 5000);
  }

  loginPause();
  return (
    <div id="welcome-screen">
      <h1>Welcome</h1>
      <p>{message}</p>
    </div>
  );
}
