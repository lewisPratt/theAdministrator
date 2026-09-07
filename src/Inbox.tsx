import { useState, type JSX } from "react";
import spamEmails from "./generator_modules/emailsGenerator";
import { LoaderCircle } from "lucide-react";

const emails = [
  {
    title: "Welcome to your new role",
    message: (
      <>
        Welcome to your new role in The Administration.
        <p className="email-body-p">
          This is a highly responsible post and requires the utmost attention
          and focus to complete.
        </p>
        <p className="email-body-p">
          Your role is to identify the non-compliant, disruptive and criminal
          elements that take root in our City.
        </p>
        <p className="email-body-p">
          Each interview transcript that you review is a digital representation
          of an interaction taking place across the City right now.
        </p>
        <p className="email-body-p">
          Your decision will determine if the Citizen retains their freedom or
          is sent to a Re-education facility.
        </p>
        <p className="email-body-p bold">
          Each Citizen is given an initial score of 0. Each positive (+1) and
          negative (-1) aspect of the transcript will alter this score.
        </p>
        <p className="email-body-p">
          It is your job to review the system generated decision and validate
          this decision.
        </p>
        <p className="email-body-p bold">
          {" "}
          Correctly aligning with the System's appraisal of the Citizen will
          earn you credits, which can be exchanged in the Voucher Terminal.
        </p>
      </>
    ),
    sender: "Head of Admin",
  },
  {
    title: "Do not ignore this message",
    message: <>Th3y @r3 VV@tch1nG Y0u @LVV@y2</>,
    sender: "Anonymous",
  },
  {
    title: "How to use",
    message: (
      <>Select a message in the sidebar to read recently received messages</>
    ),
    sender: "central Admin",
  },
];

interface emailShape {
  title: string;
  message: JSX.Element;
  sender: string;
}

export default function Inbox() {
  const [activeEmail, setActiveEmail] = useState<emailShape | null>(emails[2]);
  const [extraMail, setExtraMail] = useState<emailShape[] | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  function startRefresh() {
    if (!refreshing) {
      setRefreshing(true);
      setTimeout(refreshInbox, 2000);
    }
  }

  function refreshInbox() {
    setRefreshing(false);
    const chance = Math.floor(Math.random() * 10) + 1;
    if (chance < 3) {
      console.log("hit");
      //grab email to add to list
      const newMail =
        spamEmails[Math.floor(Math.random() * spamEmails.length) + 1];
      let updatedMails: emailShape[] = [];
      if (extraMail) {
        updatedMails = [...extraMail];
      }
      const finalMails = updatedMails.concat(newMail);
      console.log(finalMails);
      setExtraMail(finalMails);
    }
  }

  return (
    <section id="inbox-parent">
      <div id="inbox-header" className="striped-bg">
        <h2>Worker inbox</h2>
      </div>
      <div id="inbox-content">
        <div id="inbox-sidebar" className="grid-bg">
          <ul>
            <li
              onClick={() => {
                setActiveEmail(emails[0]);
              }}
            >
              Welcome to yo...
            </li>
            <li
              onClick={() => {
                setActiveEmail(emails[1]);
              }}
            >
              Do not igno...
            </li>
            {extraMail &&
              extraMail.map((mail) => {
                return (
                  <li
                    onClick={() => {
                      setActiveEmail(mail);
                    }}
                  >
                    {mail.title}
                  </li>
                );
              })}
            {refreshing && <LoaderCircle className="loader" />}
            <li onClick={startRefresh} id="message-check-button">
              Refresh Inbox
            </li>
          </ul>
        </div>
        <div id="inbox-message-viewer">
          {activeEmail && (
            <>
              <h3>
                Subject: <span>{activeEmail.title}</span>
              </h3>
              <div className="email-para">
                <span className="sender-name">
                  Message: <br />
                  <br />
                </span>
                {activeEmail.message}
              </div>
              <p className="email-para">
                <span className="sender-name">Sender: </span>
                {activeEmail.sender}
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
