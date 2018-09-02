const createBalls = (data) => {
  let currentBall = 0;
  for (const it of data.answers) {
    switch (true) {
      case (it.answer === `true` && it.time > 30):
        currentBall += 1;
        break;
      case (it.answer === `true` && it.time <= 30):
        currentBall += 2;
        break;
      case (it.answer === `false`):
        currentBall -= 2;
        break;
    }
  }
  return currentBall;
};

export default createBalls;
