# Rippling Time Tracker

Automatically submit time entries to Rippling for a given month.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
WORK_SCHEDULE=09:00,18:00
BREAK_SCHEDULE=12:00,13:00
MONTH=2025-07
TOKEN=your_rippling_token
USER_ID=your_user_id
COMPANY_ID=your_company_id
TIMEZONE=Europe/Madrid
WELLNESS_DAYS=2025-07-15,2025-07-20
```

## Configuration

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `WORK_SCHEDULE` | ✅ | Work start and end times | `09:00,18:00` |
| `BREAK_SCHEDULE` | ❌ | Break start and end times | `12:00,13:00` |
| `MONTH` | ✅ | Target month | `2025-07` |
| `TOKEN` | ✅ | Rippling auth token | |
| `USER_ID` | ✅ | Your Rippling user ID | |
| `COMPANY_ID` | ✅ | Your company ID | |
| `TIMEZONE` | ❌ | Timezone (default: Europe/Madrid) | `America/New_York` |
| `WELLNESS_DAYS` | ❌ | Days to skip (comma-separated) | `2025-07-15,2025-07-20` |

## Usage

```bash
node main.js
```

## Features

- ✅ Only processes weekdays (Mon-Fri)
- ✅ Stops at current date (no future entries)
- ✅ Supports wellness days exclusion
- ✅ Optional break scheduling
- ✅ Timezone support