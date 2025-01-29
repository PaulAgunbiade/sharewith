import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import CloseIcon from '@mui/icons-material/Close';

import { getDaysOfWeekButtons, sanitizeClinicData } from './availabilityHelper';

import styles from './AvailabilityModal.module.scss';
import ModalBody from './modalBody/ModalBody';

AddAvailabilityModal.propTypes = {
  clinicData: PropTypes.shape({
    services: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.any,
        label: PropTypes.string,
      }),
    ).isRequired,
    locations: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.any,
        label: PropTypes.string,
      }),
    ).isRequired,
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default function AddAvailabilityModal({ clinicData, closeModal }) {
  const [sanitizedClinicData, setSanitizedClinicData] = useState({
    services: [],
    locations: [],
  });
  const [formData, setFormData] = useState({
    date: new Date(),
    startTime: '',
    endTime: '',
    recurrenceNum: 1,
    recurrenceFreq: 'week',
    daysOfWeek: [],
    services: [],
    locations: [],
  });
  const [errors, setErrors] = useState({
    timeRange: '',
  });
  useEffect(() => {
    const data = sanitizeClinicData(clinicData);
    setSanitizedClinicData(data);
  }, []);

  const updateForm = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const updateErrors = (field, value) => {
    setErrors((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalNavbar}>
        <p className={styles.modalHeader}>New Availability</p>
        <CloseIcon className={styles.closeIcon} onClick={() => closeModal()} />
      </div>
      <ModalBody
        formData={formData}
        clinicData={sanitizedClinicData}
        errors={errors}
        updateFrom={updateForm}
        updateErrors={updateErrors}
      />
    </div>
  );
}
