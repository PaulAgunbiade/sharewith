import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getClientData } from './CalendarEventModalHelper';

import styles from './CalendarEventModal.module.scss';

CalendarEventModal.propTypes = {
  eventData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    service: PropTypes.shape({
      name: PropTypes.string,
      duration: PropTypes.number,
    }).isRequired,
    clientName: PropTypes.string.isRequired,
    startTime: PropTypes.instanceOf(Date).isRequired,
    endTime: PropTypes.instanceOf(Date).isRequired,
    location: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired,
  }),
};

export default function CalendarEventModal({ eventData }) {
  const [clientData, setClientData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setClientData(getClientData(eventData.clientName));
    };
    fetchData();
  });
  return (
    <div className={styles.modalContainer}>
      <p>{clientData.name}</p>
      <p>{clientData.phone}</p>
      <p>{clientData.email}</p>
      <p>{clientData.prevSession}</p>
    </div>
  );
}
