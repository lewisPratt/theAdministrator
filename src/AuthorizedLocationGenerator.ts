export function generateAuthorizedLocations() {
  const noOfLocations = Math.floor(Math.random() * 3) +1;
  const districts = [1, 2, 3, 4, 6, 7,8, 9, 10, 11, 12, 13];
  let authorizedLocations: number[] = [];

  function shuffleArray(a: number[]) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
  }

  for (let index = 0; index < noOfLocations; index++) {
    shuffleArray(districts);
    const grab = districts.pop();
    if (grab) {
      authorizedLocations.push(grab);
    }
  }

  return authorizedLocations;
}
