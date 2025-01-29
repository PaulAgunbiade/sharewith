export async function saveBusinessHours(axios, toast, timeZone, schedule) {
  const data = { timeZone, schedule };
  try {
    await axios.post('/clinic/schedule', data);
    toast.success('Your new business hours have been saved.');
  } catch (error) {
    if (error?.response?.status === 400 || error?.response?.status === 500)
      toast.error(
        'There was an error saving your hours, please try again later.',
      );
  }
}

export async function getBusinessHours(axios, toast) {
  try {
    const fields = ['schedule', 'timeZone'];
    const res = await axios.get('/clinic', {
      params: {
        fields,
      },
    });
    return res.data;
  } catch (error) {
    if (error?.response?.status === 400 || error?.response?.status === 500)
      toast.error(
        'There was an error saving your hours, please try again later.',
      );
  }
}

export const DEFAULT_SCHEDULE = [
  {
    day: 'sunday',
    on: false,
    times: [{ start: '09:00', end: '17:00', error: false }],
  },
  {
    day: 'monday',
    on: true,
    times: [{ start: '09:00', end: '17:00', error: false }],
  },
  {
    day: 'tuesday',
    on: true,
    times: [{ start: '09:00', end: '17:00', error: false }],
  },
  {
    day: 'wednesday',
    on: true,
    times: [{ start: '09:00', end: '17:00', error: false }],
  },
  {
    day: 'thursday',
    on: true,
    times: [{ start: '09:00', end: '17:00', error: false }],
  },
  {
    day: 'friday',
    on: true,
    times: [{ start: '09:00', end: '17:00', error: false }],
  },
  {
    day: 'saturday',
    on: false,
    times: [{ start: '09:00', end: '17:00', error: false }],
  },
];

export const DAYS_OF_WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export const TIME_ZONES = [
  'Pacific Time - US & Canada',
  'Mountain Time - US & Canada',
  'Central Time - US & Canada',
  'Eastern Time - US & Canada',
  'Alaska Time',
  'Arizona, Yukon Time',
  'Newfoundland Time',
  'Hawaii Time',
];

export const DEFAULT_TIME_ZONE = 'Pacific Time - US & Canada';

export const TIMES = [
  '00:00',
  '00:15',
  '00:30',
  '00:45',
  '01:00',
  '01:15',
  '01:30',
  '01:45',
  '02:00',
  '02:15',
  '02:30',
  '02:45',
  '03:00',
  '03:15',
  '03:30',
  '03:45',
  '04:00',
  '04:15',
  '04:30',
  '04:45',
  '05:00',
  '05:15',
  '05:30',
  '05:45',
  '06:00',
  '06:15',
  '06:30',
  '06:45',
  '07:00',
  '07:15',
  '07:30',
  '07:45',
  '08:00',
  '08:15',
  '08:30',
  '08:45',
  '09:00',
  '09:15',
  '09:30',
  '09:45',
  '10:00',
  '10:15',
  '10:30',
  '10:45',
  '11:00',
  '11:15',
  '11:30',
  '11:45',
  '12:00',
  '12:15',
  '12:30',
  '12:45',
  '13:00',
  '13:15',
  '13:30',
  '13:45',
  '14:00',
  '14:15',
  '14:30',
  '14:45',
  '15:00',
  '15:15',
  '15:30',
  '15:45',
  '16:00',
  '16:15',
  '16:30',
  '16:45',
  '17:00',
  '17:15',
  '17:30',
  '17:45',
  '18:00',
  '18:15',
  '18:30',
  '18:45',
  '19:00',
  '19:15',
  '19:30',
  '19:45',
  '20:00',
  '20:15',
  '20:30',
  '20:45',
  '21:00',
  '21:15',
  '21:30',
  '21:45',
  '22:00',
  '22:15',
  '22:30',
  '22:45',
  '23:00',
  '23:15',
  '23:30',
  '23:45',
];
