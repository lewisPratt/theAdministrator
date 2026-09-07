const emails = [
  {
    title: "Welcome to your new role",
    message:
      "Fugiat et excepteur id proident sunt et cillum voluptate aute. Cupidatat adipisicing id cupidatat voluptate consequat duis non aute. Occaecat duis labore esse officia aliqua. Sint aliquip Lorem tempor voluptate ut elit ullamco incididunt dolore fugiat ea commodo dolore. Commodo ad id sunt eu adipisicing consectetur eiusmod voluptate laborum excepteur velit cupidatat enim eu.",
    sender: "Head of Admin",
  },
  {
    title: "Do no ignore this message",
    message: "Qui ut eu aliqua dolor.",
    sender: "Anonymous",
  },
  {
    title: "How to use",
    message:
      "Do consectetur ullamco et fugiat excepteur nisi qui nostrud incididunt amet ipsum do cupidatat nostrud. Commodo magna proident excepteur laboris non do esse laborum qui. Labore ipsum laboris in fugiat tempor in minim nostrud veniam magna tempor proident id pariatur. Occaecat et dolore dolore deserunt amet magna. Tempor veniam aliquip consequat ipsum laborum ullamco id sunt eiusmod nulla.",
    sender: "central Admin",
  },
];

interface emailShape {
  title: string;
  message: string;
  sender: string;
}
import { useState } from "react";

export default function Inbox() {
  const [activeEmail, setActiveEmail] = useState<emailShape | null>(emails[2]);

  return (
    <section id="inbox-parent">
      <div id="inbox-header">
        <h2>Worker inbox</h2>
      </div>
      <div id="inbox-content">
        <div id="inbox-sidebar">
          <ul>
            <li onClick={()=>{setActiveEmail(emails[0])}}>Welcome to yo...</li>
            <li onClick={() => {setActiveEmail(emails[1])}}>this is not s...</li>
          </ul>
        </div>
        <div id="inbox-message-viewer">
          {activeEmail && (
            <>
              <h3>{activeEmail.title}</h3>
              <p>{activeEmail.message}</p>
              <p className='sender-name'>{activeEmail.sender}</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
