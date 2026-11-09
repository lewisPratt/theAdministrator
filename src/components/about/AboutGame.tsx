import "../../assets/css/about.css";

export default function AboutGame() {
  return (
    <div id="about-content">
      <p>
        The Administrator is a text-based browser game set in a
        retro-futuristic, authoritarian city.
        <br />
        You play a city administrator working from a terminal, reviewing the
        cases of citizens and passing judgement on each one. Study their
        transcripts, belongings and behaviour, then decide: rule correctly and
        you earn credits, rule wrongly and you lose them.
      </p>
      <p className="mt-20">
        Credits buy upgrades that speed up and streamline the cycle, and
        eventually the senior Administrator titles, though a promotion may not
        change as much as you’d hope.
      </p>{" "}
      <p>
        Navigate by typing commands, as you would on an old computer system,
        with clickable shortcuts if you prefer them. Your progress is saved
        locally, so you can pick up where you left off.
      </p>
      <p className="mt-20">
        Built with React, TypeScript and Vite as a portfolio piece and my Web
        Application Development diploma project. See my other work below.
      </p>
      <a className="button-link mt-20" href="https://github.com/lewispratt" target="_blank">My Git</a>
    </div>
  );
}
