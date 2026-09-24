import { Sound } from "react-sounds";
import { useNavigate } from "react-router-dom";

const goodbyeMessages: string[] = [
  "Session terminated.",
  "Shift concluded. Record retained.",
  "Logout confirmed. Monitoring continues.",
  "Duty period ended.",
  "Access revoked until next assignment.",
  "Performance data recorded.",
  "Session closed at administrator discretion.",
  "Terminal deactivated.",
  "Your file has been updated.",
  "Standing reviewed. Result pending.",
  "Departure authorized.",
  "Session end logged.",
  "Clearance suspended until further notice.",
  "End of duty. Compliance was recorded.",
];

export default function GoodbyeScreen() {
  const navigate = useNavigate();
  const goodbyeMessage =goodbyeMessages[Math.floor(Math.random()* goodbyeMessages.length) ]
  function loginPause() {
    setTimeout(() => navigate("/theAdministrator"), 5000);
  }
  loginPause();
  return (
    <div id="welcome-screen">
      <h1>Goodbye</h1>
      <p>{goodbyeMessage}</p>
      <Sound name="system/lock" trigger="mount" options={{ loop: false }} />
    </div>
  );
}
