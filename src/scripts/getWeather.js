import { format } from "date-fns";

const processCurrentConditions = ({
  conditions,
  feelslike,
  humidity,
  icon,
  temp,
}) => ({
  conditions,
  feelslike,
  humidity,
  icon,
  temp,
});

const processHourData = ({ datetime, humidity, icon, temp }) => ({
  datetime,
  humidity,
  icon,
  temp,
});

const getNext24Hours = (todayHours, tomorrowHours) => {
  const now = new Date();

  const processedTodayHours = todayHours.filter(
    ({ datetime }) => datetime >= format(now, "HH:mm:ss"),
  );
  const processedTomorrowHours = tomorrowHours.slice(
    0,
    24 - processedTodayHours.length,
  );

  return [...processedTodayHours, ...processedTomorrowHours];
};

const processDailyData = ({
  datetime,
  humidity,
  icon,
  tempmax,
  tempmin,
}) => ({
  datetime,
  humidity,
  icon,
  tempmax,
  tempmin,
});

const processWeatherData = ({ address, currentConditions, days }) => {
  const current = processCurrentConditions(currentConditions);

  const week = days.slice(0, 7).map(processDailyData);

  const todayHours = days[0].hours.map(processHourData);

  const tomorrowHours = days[1].hours.map(processHourData);

  const hours = getNext24Hours(todayHours, tomorrowHours);

  return {
    address,
    current,
    week,
    hours,
    tomorrowHours,
  };
};

export default async (loca) => {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${loca}?unitGroup=metric&key=W3MXMLU37J4EAJ5YRBBSGPPAZ&contentType=json`,
  );

  if (!response.ok) {
    const msg = await response.text();
    throw new Error(msg);
  }

  const data = await response.json();

  return processWeatherData(data);
};
