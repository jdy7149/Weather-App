import getWeather from "./getWeather";

export const searchInput = document.querySelector("#location");
export const searchBtn = document.querySelector("#search");
const contentDiv = document.querySelector(".content");

const getCurrentConditionsCard = (address, currentConditions) => {
  const card = document.createElement("div");

  const addressPara = document.createElement("p");
  addressPara.textContent = address;

  const tempPara = document.createElement("p");
  tempPara.textContent = currentConditions.temp;

  import(`./icons/${currentConditions.icon}.svg`).then((icon) => {
    const iconImg = document.createElement("img");
    iconImg.src = icon.default;
    iconImg.alt = "Weather Icon";
    tempPara.appendChild(iconImg);
  });

  const conditionsPara = document.createElement("p");
  conditionsPara.textContent = currentConditions.conditions;

  const feelslikePara = document.createElement("p");
  feelslikePara.textContent = `Feels like: ${currentConditions.feelslike}`;

  const humidityPara = document.createElement("p");
  humidityPara.textContent = currentConditions.humidity;

  card.append(
    addressPara,
    tempPara,
    conditionsPara,
    feelslikePara,
    humidityPara,
  );

  return card;
};

const getHoursForecastCard = (todayHours, tomorrowHours) => {};

const getWeekForecastCard = (week) => {};

export default async (loca) => {
  try {
    const data = await getWeather(loca);

    console.log({ data });

    const currentConditionsCard = getCurrentConditionsCard(
      data.address,
      data.current,
    );
    const hoursForecastCard = getHoursForecastCard(
      data.todayHours,
      data.tomorrowHours,
    );
    const weekForecastCard = getWeekForecastCard(data.week);

    contentDiv.replaceChildren(
      currentConditionsCard,
      hoursForecastCard,
      weekForecastCard,
    );
  } catch (error) {
    console.log(error.message);
  }
};
