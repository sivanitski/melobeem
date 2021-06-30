export const SECTOR_ANGLE = 45;
export const HALF_SECTOR_ANGLE = 22.5;
export const FULL_ROUND = 360;
export const FIRST_ANIMATION_TIME = 1000;
export const FIRST_ANIMATION_SPEED = FULL_ROUND / FIRST_ANIMATION_TIME;

export const calculateAnimationAngle = (result) => {
  switch (result) {
    case 0:
      return HALF_SECTOR_ANGLE + SECTOR_ANGLE * 5;
    case 1:
      return HALF_SECTOR_ANGLE;
    case 10:
      return HALF_SECTOR_ANGLE;
    case 2:
      return HALF_SECTOR_ANGLE + SECTOR_ANGLE;
    case 20:
      return HALF_SECTOR_ANGLE + SECTOR_ANGLE;
    case 3:
      return HALF_SECTOR_ANGLE + 7 * SECTOR_ANGLE;
    case 30:
      return HALF_SECTOR_ANGLE + 7 * SECTOR_ANGLE;
    case 4:
      return HALF_SECTOR_ANGLE + 3 * SECTOR_ANGLE;
    case 40:
      return HALF_SECTOR_ANGLE + 3 * SECTOR_ANGLE;
  }
};

export const calcSecondAnimationParameters = (currentTime, prizeAmount) => {
  const fullRoundsAfterFirstAnimation =
    Math.floor(currentTime / FIRST_ANIMATION_TIME) + 1;
  const anglePrize = calculateAnimationAngle(prizeAmount);

  const endAngle = fullRoundsAfterFirstAnimation * FULL_ROUND + anglePrize;
  const currentAngle = currentTime * FIRST_ANIMATION_SPEED;
  const secondAnimationTime = (endAngle - currentAngle) / FIRST_ANIMATION_SPEED;

  return {
    endAngle,
    currentAngle,
    secondAnimationTime,
  };
};
