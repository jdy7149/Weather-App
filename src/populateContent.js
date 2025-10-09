import { format } from "date-fns";

import getWeather from "./getWeather";

export const searchInput = document.querySelector("#location");
export const searchBtn = document.querySelector("#search");
const contentDiv = document.querySelector(".content");

const getCurrentConditionsContainer = ({ address, current }) => {
  const containerDiv = document.createElement("div");
  containerDiv.classList.add("current");

  const addressPara = document.createElement("p");
  addressPara.classList.add("address");
  addressPara.textContent = address;

  const tempPara = document.createElement("p");
  tempPara.classList.add("temp");
  tempPara.textContent = current.temp;

  const iconPara = document.createElement("p");
  iconPara.classList.add("icon");

  import(`./icons/${current.icon}.svg`).then((iconData) => {
    const iconImg = document.createElement("img");
    iconImg.src = iconData.default;
    iconImg.alt = "Weather Icon";
    iconPara.appendChild(iconImg);
  });

  const conditionsPara = document.createElement("p");
  conditionsPara.classList.add("conditions");
  conditionsPara.textContent = current.conditions;

  const feelslikePara = document.createElement("p");
  feelslikePara.classList.add("feelslike");
  feelslikePara.textContent = `Feels like: ${current.feelslike}`;

  const humidityPara = document.createElement("p");
  humidityPara.classList.add("humidity");
  humidityPara.textContent = current.humidity;

  containerDiv.append(
    addressPara,
    tempPara,
    iconPara,
    conditionsPara,
    feelslikePara,
    humidityPara,
  );

  return containerDiv;
};

const getHoursForecastCard = ({ hours }) => {
  const containerDiv = document.createElement("div");
  containerDiv.classList.add("hours-forecast");

  hours.forEach(({ datetime, icon, temp, humidity }) => {
    const card = document.createElement("div");
    card.classList.add("hours-forecast-card");

    const datetimePara = document.createElement("p");
    datetimePara.classList.add("datetime");
    datetimePara.textContent = datetime;

    const iconPara = document.createElement("p");
    iconPara.classList.add("icon");

    import(`./icons/${icon}.svg`).then((iconData) => {
      const iconImg = document.createElement("img");
      iconImg.src = iconData.default;
      iconImg.alt = "Weather Icon";
      iconPara.appendChild(iconImg);
    });

    const tempPara = document.createElement("p");
    tempPara.classList.add("temp");
    tempPara.textContent = temp;

    const humidityPara = document.createElement("p");
    humidityPara.classList.add("humidity");
    humidityPara.textContent = humidity;

    card.append(datetimePara, iconPara, tempPara, humidityPara);

    containerDiv.appendChild(card);
  });

  return containerDiv;
};

const getWeekForecastContainer = ({ week }) => {
  const containerDiv = document.createElement("div");
  containerDiv.classList.add("week-forecast");

  week.forEach(({ datetime, humidity, icon, tempmax, tempmin }) => {
    const card = document.createElement("div");
    card.classList.add("week-forecast-card");

    const datetimePara = document.createElement("p");
    datetimePara.classList.add("datetime");
    datetimePara.textContent = format(datetime, "EEEE"); 

    const humidityPara = document.createElement("p");
    humidityPara.classList.add("humidity");
    humidityPara.textContent = humidity;

    const iconPara = document.createElement("p");
    iconPara.classList.add("icon");

    import(`./icons/${icon}.svg`).then((iconData) => {
      const iconImg = document.createElement("img");
      iconImg.src = iconData.default;
      iconImg.alt = "Weather Icon";
      iconPara.append(iconImg);
    });

    const tempmaxPara = document.createElement("p");
    tempmaxPara.classList.add("tempmax");
    tempmaxPara.textContent = tempmax;

    const tempminPara = document.createElement("p");
    tempminPara.classList.add("tempmin");
    tempminPara.textContent = tempmin;

    card.append(datetimePara, humidityPara, iconPara, tempmaxPara, tempminPara);
    containerDiv.appendChild(card);
  });

  return containerDiv;
};

export default async (loca) => {
  try {
    const data = await getWeather(loca);

    console.log({ data });

    const currentConditionsCard = getCurrentConditionsContainer(data);
    const hoursForecastCard = getHoursForecastCard(data);
    const weekForecastCard = getWeekForecastContainer(data);

    contentDiv.replaceChildren(
      currentConditionsCard,
      hoursForecastCard,
      weekForecastCard,
    );
  } catch (error) {
    console.log(error.message);
  }
};
