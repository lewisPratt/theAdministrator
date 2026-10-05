import { Sound } from "react-sounds";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { PlayerContext } from "../../context_providers/PlayerContext";
import type { playerDataShape } from "../../interfaces/interfaces";

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
  // const { playerData, setPlayerData } = useContext(PlayerContext);
  const welcomeMessage =
    welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
    
  useEffect(() => {
    // const savedData = localStorage.getItem("The_Administrator_Game");

    // console.log(playerData);

    // if (!savedData) {
    //   localStorage.setItem(
    //     "The_Administrator_Game",
    //     JSON.stringify(playerData),
    //   );
    // } else {
    //   const parsedPlayerData: playerDataShape = JSON.parse(savedData);
    //   if (parsedPlayerData.player_name === playerData.player_name) {
    //     setPlayerData(JSON.parse(savedData));
    //   } else {
    //     localStorage.setItem(
    //       "The_Administrator_Game",
    //       JSON.stringify(playerData),
    //     );
    //   }
    // }
  }, []);

  function loginPause() {
    setTimeout(() => navigate("/Terminal"), 5000);
  }

  loginPause();
  return (
    <div id="welcome-screen">
      <h1>Welcome</h1>
      <p>{welcomeMessage}</p>
      <Sound name="system/boot_up" trigger="mount" options={{ loop: false }} />
    </div>
  );
}
