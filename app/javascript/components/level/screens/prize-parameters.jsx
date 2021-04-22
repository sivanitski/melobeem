import classNames from "classnames";
import React from "react";

import { getExperationTimeInHoursInMinutes } from "../../../helpers/date";
import {
  makeFirstLetterUppercase,
  makePluralForm,
} from "../../../helpers/utils";
import PrizeHeart from "../../../images/prize-heart.svg";
import PrizeSpinOrangeImage from "../../../images/prize-spinner-orange.svg";
import PrizeSpinPinkImage from "../../../images/prize-spinner-pink.svg";
import PrizeSpinPurpleImage from "../../../images/prize-spinner-purple.svg";
import PrizeTimeBlueImage from "../../../images/prize-time-blue.svg";
import PrizeTimeGreenImage from "../../../images/prize-time-green.svg";
import PrizeTimeYellowImage from "../../../images/prize-time-yellow.svg";

const definePrizeImage = (currentPrize) => {
  switch (currentPrize.sourceType) {
    case "min":
      if (currentPrize.value === 10) {
        return <PrizeTimeGreenImage />;
      }

      if (currentPrize.value === 20) {
        return <PrizeTimeYellowImage />;
      }

      if (currentPrize.value === 30) {
        return <PrizeTimeBlueImage />;
      }
    case "vote":
      return <PrizeHeart />;
    case "spin":
      if (currentPrize.value === 1) {
        return <PrizeSpinPinkImage />;
      }

      if (currentPrize.value === 5) {
        return <PrizeSpinPurpleImage />;
      }

      if (currentPrize.value === 10) {
        return <PrizeSpinOrangeImage />;
      }
  }
};

const definePrizeTitle = (currentPrize) => {
  if (currentPrize.sourceType === "min") {
    return `Time ${currentPrize.value} min`;
  }

  return makePluralForm(
    `${currentPrize.value} ${makeFirstLetterUppercase(
      currentPrize.sourceType
    )}`,
    currentPrize.value
  );
};

const definePrizeText = (currentPrize, currentData) => {
  if (currentPrize.sourceType !== "min") {
    return "Claim your prize for completing the Level. Good luck!";
  }

  if (currentData) {
    return `You can’t use 2 timers at the same time. You need to wait ${getExperationTimeInHoursInMinutes(
      currentData
    )}`;
  }

  return "You and your frinds can Vote every 10 min for 24 hours";
};

export const definePrizeParameters = (currentPrize, time) => {
  return {
    image: definePrizeImage(currentPrize),
    title: definePrizeTitle(currentPrize),
    text: definePrizeText(currentPrize, time),
  };
};

export const defineColorClass = (parameter, currentPrize) => {
  const color = classNames({
    pink:
      currentPrize.sourceType === "vote" ||
      (currentPrize.sourceType === "spin" && currentPrize.value === 1),
    purple: currentPrize.sourceType === "spin" && currentPrize.value === 5,
    orange: currentPrize.sourceType === "spin" && currentPrize.value === 10,
    green: currentPrize.sourceType === "min" && currentPrize.value === 10,
    yellow: currentPrize.sourceType === "min" && currentPrize.value === 20,
    blue: currentPrize.sourceType === "min" && currentPrize.value === 30,
  });

  return `${parameter}-${color}`;
};
