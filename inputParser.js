function parseSchedule(schedule, name) {
  if (!schedule) return null;
  const parts = schedule.split(',').map(s => s.trim());
  if (parts.length !== 2) {
    console.error(`Invalid ${name} format. Expected: HH:MM,HH:MM`);
    process.exit(1);
  }
  return { start: parts[0], end: parts[1] };
}

function parseWellnessDays(wellnessDays) {
  return wellnessDays ? wellnessDays.split(',').map(day => day.trim()) : [];
}

function validateRequiredEnvVars(vars) {
  const missing = Object.entries(vars)
    .filter(([key, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    console.error(`Missing required environment variables: ${missing.join(', ')}`);
    process.exit(1);
  }
}

function parseInput() {
  const workTimes = parseSchedule(process.env.WORK_SCHEDULE, 'WORK_SCHEDULE');
  const breakTimes = parseSchedule(process.env.BREAK_SCHEDULE, 'BREAK_SCHEDULE');
  const wellnessDays = parseWellnessDays(process.env.WELLNESS_DAYS);

  validateRequiredEnvVars({
    WORK_SCHEDULE: process.env.WORK_SCHEDULE,
    MONTH: process.env.MONTH,
    TOKEN: process.env.TOKEN,
    USER_ID: process.env.USER_ID,
    COMPANY_ID: process.env.COMPANY_ID
  });

  return {
    workTimes,
    breakTimes,
    wellnessDays,
    month: process.env.MONTH,
    token: process.env.TOKEN,
    roleId: process.env.USER_ID,
    companyId: process.env.COMPANY_ID,
    timezone: process.env.TIMEZONE || 'Europe/Madrid'
  };
}

module.exports = { parseSchedule, parseInput }
