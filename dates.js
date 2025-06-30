const dayjs = require("dayjs");
const minMax = require('dayjs/plugin/minMax');
dayjs.extend(minMax);

function getWorkdays(month, wellnessDays = []) {
  const today = dayjs();
  const start = dayjs(`${month}-01`);
  const end = dayjs.min(start.endOf('month'), today);
  const totalDays = end.diff(start, 'day') + 1;

  return Array.from({ length: totalDays }, (_, index) => start.add(index, 'day'))
    .filter(isWeekday)
    .map(day => day.format('YYYY-MM-DD'))
    .filter(isNotWellnessDay(wellnessDays));
}

function localTime(day, hour, timezone) {
  return dayjs.tz(`${day}T${hour}`, timezone).format();
}

function isWeekday(day) {
  const weekday = day.day();
  return weekday >= 1 && weekday <= 5;
}

function isNotWellnessDay(wellnessDays) {
  return dayStr => !wellnessDays.includes(dayStr);
}


module.exports = { getWorkdays, localTime };
