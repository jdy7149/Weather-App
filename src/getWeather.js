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

const processDailyData = ({
  datetime,
  humidity,
  icon,
  temp,
  tempmax,
  tempmin,
}) => ({
  datetime,
  humidity,
  icon,
  temp,
  tempmax,
  tempmin,
});

const processWeatherData = ({ address, currentConditions, days }) => {
  const current = processCurrentConditions(currentConditions);

  const week = days.slice(0, 7).map(processDailyData);

  const todayHours = days[0].hours.map(processHourData);

  const tomorrowHours = days[1].hours.map(processHourData);

  return {
    address,
    current,
    week,
    todayHours,
    tomorrowHours,
  };
};

export default async (loca) => {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${loca}?unitGroup=metric&key=W3MXMLU37J4EAJ5YRBBSGPPAZ&contentType=json`,
    );

    if (!response.ok) throw new Error(`Status code: ${response.status}`);

    const data = await response.json();

    console.log(processWeatherData(data));
  } catch (error) {
    console.log(error.message);
  }
};
