export function sanitizeClinicData(clinicData) {
  const sanitizedServices = clinicData.services.map((s) => {
    return { value: s.id, label: s.name };
  });
  const sanitizedLocations = clinicData.locations.map((l) => {
    return { value: l.id, label: l.address };
  });
  return {
    services: sanitizedServices,
    locations: sanitizedLocations,
  };
}

export const recurrenceNumOptions = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 4,
    label: '4',
  },
];

export const recurrenceFreqOptions = [
  {
    value: 'day',
    label: 'Day',
  },
  {
    value: 'week',
    label: 'Week',
  },
  {
    value: 'month',
    label: 'Month',
  },
  {
    value: 'year',
    label: 'Year',
  },
];

export const getDaysOfWeekButtons = (updateForm, styles) => [
  {
    id: 0,
    text: 'SUN',
    onClick: () => {},
    baseClassname: styles.dayOfWeekButton,
    selectedClassname: styles.dayOfWeekSelectedButton,
  },
  {
    id: 1,
    text: 'MON',
    onClick: () => {},
    baseClassname: styles.dayOfWeekButton,
    selectedClassname: styles.dayOfWeekSelectedButton,
  },
  {
    id: 2,
    text: 'TUE',
    onClick: () => {},
    baseClassname: styles.dayOfWeekButton,
    selectedClassname: styles.dayOfWeekSelectedButton,
  },
  {
    id: 3,
    text: 'WED',
    onClick: () => {},
    baseClassname: styles.dayOfWeekButton,
    selectedClassname: styles.dayOfWeekSelectedButton,
  },
  {
    id: 4,
    text: 'THU',
    onClick: () => {},
    baseClassname: styles.dayOfWeekButton,
    selectedClassname: styles.dayOfWeekSelectedButton,
  },
  {
    id: 5,
    text: 'FRI',
    onClick: () => {},
    baseClassname: styles.dayOfWeekButton,
    selectedClassname: styles.dayOfWeekSelectedButton,
  },
  {
    id: 6,
    text: 'SAT',
    onClick: () => {},
    baseClassname: styles.dayOfWeekButton,
    selectedClassname: styles.dayOfWeekSelectedButton,
  },
];
