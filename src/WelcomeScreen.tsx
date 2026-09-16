import { Sound } from "react-sounds";
import { useNavigate } from "react-router-dom";

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
  const welcomeMessage =welcomeMessages[Math.floor(Math.random()* welcomeMessages.length) + 1]
  function loginPause() {
    setTimeout(() => navigate("/CommandCentre"), 5000);
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
