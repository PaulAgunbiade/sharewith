export function getDummyEvents() {
  return [
    {
      id: 1,
      startTime: new Date('May 28, 2024, 07:00'),
      endTime: new Date('May 28, 2024, 08:00'),
      title: 'Jane Doe',
      subtitle: 'Virtual',
      classNames: getEventStyles(true),
    },
    {
      id: 2,
      startTime: new Date('May 29, 2024, 18:00'),
      endTime: new Date('May 29, 2024, 19:00'),
      title: 'Jane Doe',

      subtitle: 'Virtual',
      classNames: getEventStyles(true),
    },
    {
      id: 3,
      startTime: new Date('May 29, 2024, 10:00'),
      endTime: new Date('May 29, 2024, 12:00'),
      title: 'Jane Doe',

      subtitle: 'Virtual',
      classNames: getEventStyles(true),
    },
    {
      id: 4,
      startTime: new Date('May 29, 2024, 12:00'),
      endTime: new Date('May 29, 2024, 13:00'),
      title: 'Jane Doe',

      subtitle: 'Virtual',
      classNames: getEventStyles(false),
    },
    {
      id: 5,
      startTime: new Date('May 26, 2024, 09:00'),
      endTime: new Date('May 26, 2024, 12:00'),
      title: 'Jane Doe',

      subtitle: 'Virtual',
      classNames: getEventStyles(true),
    },
    {
      id: 6,
      startTime: new Date('May 27, 2024, 10:00'),
      endTime: new Date('May 27, 2024, 11:00'),
      title: 'Jane Doe',

      subtitle: 'Virtual',
      classNames: getEventStyles(true),
    },
    {
      id: 7,
      startTime: new Date('May 25, 2024, 11:00'),
      endTime: new Date('May 25, 2024, 11:30'),
      title: 'Jane Doe',

      subtitle: 'Virtual',
      classNames: getEventStyles(true),
    },
    {
      id: 8,
      startTime: new Date('May 31, 2024, 12:00'),
      endTime: new Date('May 31, 2024, 12:45'),
      title: 'Jane Doe',

      subtitle: 'Virtual',
      classNames: getEventStyles(false),
    },
    {
      id: 9,
      startTime: new Date('Jun 1, 2024, 18:00'),
      endTime: new Date('Jun 1, 2024, 18:45'),
      title: 'Jane Doe',

      subtitle: 'Virtual',
      classNames: getEventStyles(false),
    },
    {
      id: 10,
      startTime: new Date('Jun 1, 2024, 10:00'),
      endTime: new Date('Jun 1, 2024, 12:45'),
      title: 'Jane Doe',

      subtitle: 'Virtual',
      classNames: getEventStyles(false),
    },
  ];
}

export function getDummyAvailability() {
  return [
    {
      id: 1,
      startTime: new Date('May 28, 2024, 07:00'),
      endTime: new Date('May 28, 2024, 08:00'),
      title: 'Availability',
      classNames: getAvailabilityStyles(),
      services: ['Individual Session', 'Consultation'],
      locations: ['Office, Virtual'],
    },
    {
      id: 2,
      startTime: new Date('May 29, 2024, 18:00'),
      endTime: new Date('May 29, 2024, 19:00'),
      title: 'Availability',
      classNames: getAvailabilityStyles(),
      services: ['Individual Session', 'Consultation'],
      locations: ['Office, Virtual'],
    },
    {
      id: 3,
      startTime: new Date('May 29, 2024, 10:00'),
      endTime: new Date('May 29, 2024, 12:00'),
      title: 'Availability',
      classNames: getAvailabilityStyles(),
      services: ['Individual Session', 'Consultation'],
      locations: ['Office, Virtual'],
    },
    {
      id: 4,
      startTime: new Date('May 29, 2024, 12:00'),
      endTime: new Date('May 29, 2024, 13:00'),
      title: 'Availability',
      classNames: getAvailabilityStyles(),
      services: ['Individual Session', 'Consultation'],
      locations: ['Office, Virtual'],
    },
    {
      id: 5,
      startTime: new Date('May 26, 2024, 09:00'),
      endTime: new Date('May 26, 2024, 12:00'),
      title: 'Availability',
      classNames: getAvailabilityStyles(),
      services: ['Individual Session', 'Consultation'],
      locations: ['Office, Virtual'],
    },
    {
      id: 6,
      startTime: new Date('May 27, 2024, 10:00'),
      endTime: new Date('May 27, 2024, 11:00'),
      title: 'Availability',
      classNames: getAvailabilityStyles(),
      services: ['Individual Session', 'Consultation'],
      locations: ['Office, Virtual'],
    },
    {
      id: 7,
      startTime: new Date('May 25, 2024, 11:00'),
      endTime: new Date('May 25, 2024, 11:30'),
      title: 'Availability',
      classNames: getAvailabilityStyles(),
      services: ['Individual Session', 'Consultation'],
      locations: ['Office, Virtual'],
    },
    {
      id: 8,
      startTime: new Date('May 31, 2024, 12:00'),
      endTime: new Date('May 31, 2024, 12:45'),
      title: 'Availability',
      classNames: getAvailabilityStyles(),
      services: ['Individual Session', 'Consultation'],
      locations: ['Office, Virtual'],
    },
    {
      id: 9,
      startTime: new Date('Jun 1, 2024, 18:00'),
      endTime: new Date('Jun 1, 2024, 18:45'),
      title: 'Availability',
      classNames: getAvailabilityStyles(),
      services: ['Individual Session', 'Consultation'],
      locations: ['Office, Virtual'],
    },
    {
      id: 10,
      startTime: new Date('Jun 1, 2024, 10:00'),
      endTime: new Date('Jun 1, 2024, 12:45'),
      title: 'Availability',
      classNames: getAvailabilityStyles(),
      services: ['Individual Session', 'Consultation'],
      locations: ['Office, Virtual'],
    },
  ];
}

function getEventStyles(status) {
  let styles = {};
  styles = status
    ? {
        backgroundColor: '#e5f8eb',
        borderColor: '#06ba34',
        color: '#06ba34',
      }
    : {
        backgroundColor: '#ffebeb',
        borderColor: '#c5514f',
        color: '#c5514f',
      };
  return styles;
}

function getAvailabilityStyles() {
  return {
    backgroundColor: '#e4e4e4',
    borderColor: '#303030',
    color: '#303030',
  };
}

export function getClinicOfferings(axios, toast) {
  //   let offerings;
  //   try {
  //     const fields = ['services'];
  //     const res = await axios.get('/clinic', {
  //       params: {
  //         fields,
  //       },
  //     });
  //     offerings.services = res.data.services;
  //   } catch (error) {
  //     if (error?.response?.status === 400 || error?.response?.status === 500)
  //       toast.error(
  //         'There was an error retrieving your service offerings, please try again later.',
  //       );
  //   }
  //   try {
  //     const fields = ['locations'];
  //     const res = await axios.get('/clinic/profile', {
  //       params: {
  //         fields,
  //       },
  //     });
  //     offerings.services = res.data.locations;
  //   } catch (error) {
  //     if (error?.response?.status === 400 || error?.response?.status === 500)
  //       toast.error(
  //         'There was an error retrieving your location offerings, please try again later.',
  //       );
  //   }
  return {
    services: [
      { name: 'Consultation', id: 1 },
      { name: 'Individual Session', id: 2 },
      { name: 'Couples Session', id: 3 },
      { name: 'CBT Session', id: 4 },
      { name: 'DBT Session', id: 5 },
    ],
    locations: [
      { address: 'Downtown', id: 1 },
      { address: 'Virtual', id: 2 },
      { address: 'Home Office', id: 3 },
    ],
  };
}
