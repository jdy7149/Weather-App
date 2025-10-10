import { format } from "date-fns";

import waterPercent from "../icons/water-percent.svg";
import mapMarker from "../icons/map-marker.svg";

import getWeather from "./getWeather";

export const searchForm = document.querySelector("#searchForm");
export const searchInput = document.querySelector("#location");
const forecastDiv = document.querySelector(".forecast");
const loadingDiv = document.querySelector("#loading");

const getCurrentConditionsContainer = ({ address, current }) => {
  const containerDiv = document.createElement("div");
  containerDiv.classList.add("current");

  const addressPara = document.createElement("p");
  addressPara.classList.add("address");

  const locationIcon = document.createElement("img");
  locationIcon.src = mapMarker;
  locationIcon.alt = "Location Icon";

  const addressText = document.createElement("span");
  addressText.textContent = address.at(0).toUpperCase() + address.slice(1);

  addressPara.append(locationIcon, addressText);

  const tempPara = document.createElement("p");
  tempPara.classList.add("temp");
  tempPara.textContent = `${current.temp}°`;

  const iconPara = document.createElement("p");
  iconPara.classList.add("icon");

  import(`../icons/${current.icon}.svg`).then((iconData) => {
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
  feelslikePara.textContent = `Feels like: ${current.feelslike}°`;

  const humidityPara = document.createElement("p");
  humidityPara.classList.add("humidity");

  const humidityIcon = document.createElement("img");
  humidityIcon.src = waterPercent;
  humidityIcon.alt = "Humidity Icon";

  const humidityText = document.createElement("span");
  humidityText.textContent = current.humidity;

  humidityPara.append(humidityIcon, humidityText);

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

    const [h, m, s] = datetime.split(":");
    const dateObj = new Date();
    dateObj.setHours(h, m, s, 0);
    datetimePara.textContent = format(dateObj, "h:mm a");

    const iconPara = document.createElement("p");
    iconPara.classList.add("icon");

    import(`../icons/${icon}.svg`).then((iconData) => {
      const iconImg = document.createElement("img");
      iconImg.src = iconData.default;
      iconImg.alt = "Weather Icon";
      iconPara.appendChild(iconImg);
    });

    const tempPara = document.createElement("p");
    tempPara.classList.add("temp");
    tempPara.textContent = `${temp}°`;

    const humidityPara = document.createElement("p");
    humidityPara.classList.add("humidity");

    const humidityIcon = document.createElement("img");
    humidityIcon.src = waterPercent;
    humidityIcon.alt = "Humidity Icon";

    const humidityText = document.createElement("span");
    humidityText.textContent = humidity;

    humidityPara.append(humidityIcon, humidityText);

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

    const humidityIcon = document.createElement("img");
    humidityIcon.src = waterPercent;
    humidityIcon.alt = "Humidity Icon";

    const humidityText = document.createElement("span");
    humidityText.textContent = humidity;

    humidityPara.append(humidityIcon, humidityText);

    const iconPara = document.createElement("p");
    iconPara.classList.add("icon");

    import(`../icons/${icon}.svg`).then((iconData) => {
      const iconImg = document.createElement("img");
      iconImg.src = iconData.default;
      iconImg.alt = "Weather Icon";
      iconPara.append(iconImg);
    });

    const tempmaxPara = document.createElement("p");
    tempmaxPara.classList.add("tempmax");
    tempmaxPara.textContent = `${tempmax}°`;

    const tempminPara = document.createElement("p");
    tempminPara.classList.add("tempmin");
    tempminPara.textContent = `${tempmin}°`;

    card.append(datetimePara, humidityPara, iconPara, tempmaxPara, tempminPara);
    containerDiv.appendChild(card);
  });

  return containerDiv;
};

const hideLoading = () => {
  loadingDiv.classList.add("hidden");
  forecastDiv.classList.remove("hidden");
};

export const displayLoading = () => {
  loadingDiv.classList.remove("hidden");
  forecastDiv.classList.add("hidden");
};

export const populateContent = async (loca) => {
  try {
    const data = await getWeather(loca);

    const currentConditionsCard = getCurrentConditionsContainer(data);
    const hoursForecastCard = getHoursForecastCard(data);
    const weekForecastCard = getWeekForecastContainer(data);

    forecastDiv.replaceChildren(
      currentConditionsCard,
      hoursForecastCard,
      weekForecastCard,
    );
  } catch (error) {
    window.alert(error.message);
  } finally {
    hideLoading();
  }
};
