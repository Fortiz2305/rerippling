const dayjs = require("dayjs");
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const axios = require("axios");
const { localTime } = require("./dates");
dayjs.extend(utc);
dayjs.extend(timezone);
const API_URL = 'https://app.rippling.com/api/time_tracking/api/time_entries/';

async function submitDay(date, config) {
  const startTime = localTime(date, config.start, config.timezone);
  const endTime = localTime(date, config.end, config.timezone)

  const data = {
    company: config.company,
    role: config.role,
    jobShifts: getJobShifts(startTime, endTime),
    breaks: getBreaksFrom(config, date),
    shiftInputValues: [],
    timezone: config.timezone,
    startTime,
    originalStartTime: null,
    endTime,
    originalEndTime: null,
    source: 'WEB',
  };

  try {
    await axios.post(API_URL, data, {
      headers: {
        'authorization': `Bearer ${config.token}`,
        'content-type': 'application/json',
        'accept': '*/*',
        'company': config.company,
        'role': config.role,
      },
    });
    console.log(`✔ Entry submitted for ${date}`);
  } catch (error) {
    console.error(`❌ Failed to submit entry for ${date}:`, error.response?.data || error.message);
  }
}

function getBreaksFrom(config, date) {
  const breaks = [];
  if (config.breakStart && config.breakEnd) {
    const breakStartTime = localTime(date, config.breakStart, config.timezone)
    const breakEndTime = localTime(date, config.breakEnd, config.timezone)

    breaks.push({
      startTime: breakStartTime,
      endTime: breakEndTime,
      autoDeducted: false,
      companyBreakType: "68399fd74257ae9867d08cbd",
      index: 0,
      originalStartTime: null,
      hoursOnlyInput: false,
      originalEndTime: null
    });
  }
  return breaks;
}

function getJobShifts(startTime, endTime) {
  return [
    {
      startTime,
      endTime,
      originalStartTime: null,
      originalEndTime: null,
      jobCodes: {},
    },
  ];
}

module.exports = { submitDay };

