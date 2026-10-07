import type { reviewShape } from "../../interfaces/interfaces";

interface citizenAvatarProps {
  transcript: reviewShape;
}

export default function CitizenAvatar({ transcript }: citizenAvatarProps) {
  return (
    <div className="interviewee-avatar">
      <img
        className="avatar"
        src={transcript.avatar}
        alt="Anonymized Citizen Avatar"
        data-default=""
        onError={(e) => {
          if (e.currentTarget.dataset.default != "set") {
            e.currentTarget.src = "default-avatar.webp";
            e.currentTarget.dataset.default = "set";
          } else {
            if (e.currentTarget.parentElement) {
              e.currentTarget.parentElement.style.cssText =
                "background-color: #a2eaa2;";
            }
            e.currentTarget.before("Avatar Not Found");
            e.currentTarget.alt = "";
          }
        }}
      />
    </div>
  );
}
