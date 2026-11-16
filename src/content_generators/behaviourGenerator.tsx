const behaviour = ["Compliant", "Compliant", "Non-compliant", "Indifferent"]; 

function shuffleArray(a: string[]) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
}

export function generateBehaviour() {
  shuffleArray(behaviour);
  return behaviour[0];
}
