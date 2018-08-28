export const createBalls = (arr, hp) => {
  if (arr.length < 10) {
    return -1;
  }
  let currentBall = -6;
  for (let i = 0; i < arr.length; i++) {
    switch (true) {
      case (arr[i].time > 30):
        currentBall += 1;
        break;
      case (arr[i].time <= 30):
        currentBall += 2;
        break;
    }
  }
  for (let c = 0; c < hp; c++) {
    currentBall += 2;
  }
  return currentBall;
};
