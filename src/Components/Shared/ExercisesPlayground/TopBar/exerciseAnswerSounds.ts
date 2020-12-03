const correctSound = new Audio(`/sounds/correct.mp3`);
const failSound = new Audio(`/sounds/fail.mp3`);

export const playSound = (isAnswerCorrect: boolean) => {
  const isSoundOn = localStorage.getItem("exerciseSound");
  if (isSoundOn == "true") {
    isAnswerCorrect ? correctSound.play() : failSound.play();
  }
};
