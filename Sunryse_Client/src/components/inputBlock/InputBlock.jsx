import PropTypes from 'prop-types';

import InputErrorMessage from '../inputErrorMessage/InputErrorMessage';
import InputField from '../inputField/InputField';

import styles from './InputBlock.module.scss';

InputBlock.propTypes = {
  classname: PropTypes.string,
  placeholder: PropTypes.string,
  title: PropTypes.string.isRequired,
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      errorId: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      visible: PropTypes.bool.isRequired,
      setError: PropTypes.func.isRequired,
    }),
  ),
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  type: PropTypes.string,
  description: PropTypes.string,
  size: PropTypes.string,
};

export default function InputBlock({
  classname,
  placeholder,
  title,
  errors = [
    {
      errorId: '',
      text: '',
      visible: false,
      setError: () => {},
    },
  ],
  value,
  setValue,
  type = 'text',
  description = '',
  size = 'md',
}) {
  const hideErrors = () => {
    errors.forEach((error) => {
      const { setError } = error;
      setError(false);
    });
  };

  function CurrentErrorMessage() {
    const currentError = errors.find((error) => {
      const { visible } = error;
      return visible;
    });
    if (currentError) {
      const { text, visible, errorId } = currentError;
      return (
        <InputErrorMessage
          error={text}
          visible={visible}
          data-testid={errorId}
        />
      );
    }
    return null;
  }

  return (
    <div className={`${styles.container} ${classname}`}>
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
        <CurrentErrorMessage />
      </div>
      <div className={styles.inputFields}>
        <InputField
          placeholder={placeholder}
          onChange={(e) => {
            setValue(e.target.value);
            hideErrors();
          }}
          type={type}
          value={value}
          size={size}
        />
      </div>
      {description && <div className={styles.description}>{description}</div>}
    </div>
  );
}
