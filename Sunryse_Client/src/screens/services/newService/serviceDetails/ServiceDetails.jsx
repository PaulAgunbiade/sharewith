import PropTypes from 'prop-types';

import InputField from '../../../../components/inputField/InputField';
import TextField from '../../../../components/textField/TextField';
import Dropdown from '../../../../components/dropdown/Dropdown';

import { NEW_SERVICE_FORM_RULES } from '../newServiceFormRules';

import styles from './ServiceDetails.module.scss';

ServiceDetails.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    duration: PropTypes.any.isRequired,
    price: PropTypes.any.isRequired,
    tax: PropTypes.string.isRequired,
    taxPercent: PropTypes.any,
  }).isRequired,
  errors: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    duration: PropTypes.any.isRequired,
    price: PropTypes.any.isRequired,
    tax: PropTypes.string.isRequired,
    taxPercent: PropTypes.any,
  }).isRequired,
  updateForm: PropTypes.func.isRequired,
  updateErrors: PropTypes.func.isRequired,
};

export default function ServiceDetails({
  formData,
  errors,
  updateForm,
  updateErrors,
}) {
  return (
    <div className={styles.container}>
      <p className={styles.header}>New Service Details</p>
      <div className={styles.detailsContainer}>
        <div className={styles.infoContainer}>
          <InputField
            value={formData.name}
            setValue={(value) => updateForm('name', value)}
            placeholder="Service Name..."
            title="Service Name *"
            error={errors.name}
            resetError={() => updateErrors('name', '')}
            size="sm"
          />
          <TextField
            className={styles.textField}
            value={formData.description}
            setValue={(value) => updateForm('description', value)}
            title={'Description *'}
          />
          <InputField
            value={formData.duration}
            setValue={(value) => updateForm('duration', value)}
            minValue={0}
            placeholder="50"
            title="Duration (minutes) *"
            error={errors.duration}
            resetError={() => updateErrors('duration', '')}
            size="sm"
            type="number"
          />
        </div>
        <div className={styles.pricingContainer}>
          <InputField
            value={formData.price}
            setValue={(value) => updateForm('price', value)}
            minValue={0}
            placeholder="150.00"
            title="Price *"
            error={errors.price}
            resetError={() => updateErrors('price', '')}
            size="sm"
            type="number"
          />
          <Dropdown
            id={'taxDropdown'}
            classname={styles.taxDropdown}
            value={formData.tax}
            options={NEW_SERVICE_FORM_RULES.tax.options}
            indicator={true}
            onChange={(value) => updateForm('tax', value)}
            title={'Tax *'}
            error={errors.tax}
            resetError={() => updateErrors('tax', '')}
          />
          {formData.tax.value !== 'none' && formData.tax !== '' && (
            <InputField
              classname={styles.textField}
              value={formData.taxPercent}
              setValue={(value) => updateForm('taxPercent', value)}
              minValue={0}
              placeholder="5"
              title="Tax Percentage *"
              error={errors.taxPercent}
              resetError={() => updateErrors('taxPercent', '')}
              size="sm"
              type="number"
            />
          )}
        </div>
      </div>
    </div>
  );
}
