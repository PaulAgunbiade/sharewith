import PropTypes from 'prop-types';

import InputField from '../../../../components/inputField/InputField';
import Dropdown from '../../../../components/dropdown/Dropdown';

import { NEW_SERVICE_FORM_RULES } from '../newServiceFormRules';

import styles from './ServicePolicy.module.scss';

ServicePolicy.propTypes = {
  formData: PropTypes.shape({
    policy: PropTypes.string,
    notice: PropTypes.string,
    lateFee: PropTypes.any,
  }).isRequired,
  errors: PropTypes.shape({
    policy: PropTypes.string,
    notice: PropTypes.string,
    lateFee: PropTypes.any,
  }).isRequired,
  updateForm: PropTypes.func.isRequired,
  updateErrors: PropTypes.func.isRequired,
};

export default function ServicePolicy({
  formData,
  errors,
  updateForm,
  updateErrors,
}) {
  return (
    <div className={styles.container}>
      <p className={styles.header}>Cancellation Policy</p>
      <Dropdown
        id={'policy'}
        classname={styles.policyDropdown}
        value={formData.policy}
        options={NEW_SERVICE_FORM_RULES.policy.options}
        indicator={true}
        onChange={(value) => updateForm('policy', value)}
        title={'Policy *'}
        error={errors.policy}
        resetError={() => updateErrors('policy', '')}
      />
      {formData.policy.value === 'notice' && (
        <div className={styles.noticeContainer}>
          <Dropdown
            id={'notice'}
            classname={styles.policyDropdown}
            value={formData.notice}
            options={NEW_SERVICE_FORM_RULES.notice.options}
            indicator={true}
            onChange={(value) => updateForm('notice', value)}
            title={'Notice'}
            error={errors.notice}
            resetError={() => updateErrors('notice', '')}
          />
          <InputField
            value={formData.lateFee}
            setValue={(value) => updateForm('lateFee', value)}
            minValue={0}
            placeholder="25.00"
            title="Late Notice Charge *"
            error={errors.lateFee}
            resetError={() => updateErrors('lateFee', '')}
            size="sm"
            type="number"
          />
        </div>
      )}
    </div>
  );
}
