require('dotenv').config();
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const { getWorkdays } = require("./dates");
const { submitDay } = require("./rippling");
const { parseInput } = require("./inputParser");
dayjs.extend(utc);
dayjs.extend(timezone);

const input = parseInput();

(async () => {
  const workdays = getWorkdays(input.month, input.wellnessDays);
  const config = {
    start: input.workTimes.start,
    end: input.workTimes.end,
    token: input.token,
    timezone: input.timezone,
    company: input.companyId,
    role: input.roleId,
    breakStart: input.breakTimes?.start,
    breakEnd: input.breakTimes?.end
  }
  for (const day of workdays) {
    await submitDay(day, config);
  }
})();
