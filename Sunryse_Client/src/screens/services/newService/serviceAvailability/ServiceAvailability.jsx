import PropTypes from 'prop-types';

import WeeklyHours from '../../../businessHours/weeklyHours/WeeklyHours';
import Dropdown from '../../../../components/dropdown/Dropdown';

import { NEW_SERVICE_FORM_RULES } from '../newServiceFormRules';

import styles from './ServiceAvailability.module.scss';

ServiceAvailability.propTypes = {
  formData: PropTypes.shape({
    location: PropTypes.string.isRequired,
    availabilityType: PropTypes.string.isRequired,
    customAvailability: PropTypes.any,
  }).isRequired,
  errors: PropTypes.shape({
    location: PropTypes.string,
    availabilityType: PropTypes.string,
    customAvailability: PropTypes.any,
  }).isRequired,
  updateForm: PropTypes.func.isRequired,
  updateErrors: PropTypes.func.isRequired,
};

export default function ServiceAvailability({
  formData,
  errors,
  updateForm,
  updateErrors,
}) {
  return (
    <div className={styles.container}>
      <p className={styles.header}>New Service Availability</p>
      <Dropdown
        id={'locationDropdown'}
        classname={styles.locationDropdown}
        value={formData.location}
        options={NEW_SERVICE_FORM_RULES.location.options}
        indicator={true}
        onChange={(value) => updateForm('location', value)}
        title={'Location *'}
        error={errors.location}
        resetError={() => updateErrors('location', '')}
      />
      <Dropdown
        id={'availabilityDropdown'}
        className={
          formData.availabilityType === 'custom' && styles.availabilityDropdown
        }
        value={formData.availabilityType}
        options={NEW_SERVICE_FORM_RULES.availabilityType.options}
        indicator={true}
        onChange={(value) => updateForm('availabilityType', value)}
        title={'Availability *'}
        error={errors.availabilityType}
        resetError={() => updateErrors('availabilityType', '')}
      />
      {formData.availabilityType === 'custom' && (
        <WeeklyHours
          schedule={formData.customAvailability}
          setSchedule={(value) => updateForm('customAvailability', value)}
        />
      )}
    </div>
  );
}
