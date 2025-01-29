import PropTypes from 'prop-types';
import Select from 'react-select';

import styles from './Dropdown.module.scss';
import ErrorMessage from '../errorMessage/ErrorMessage';

Dropdown.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
  ),
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  resetError: PropTypes.func,
  title: PropTypes.string,
  indicator: PropTypes.bool,
  placeholder: PropTypes.string,
  isMulti: PropTypes.bool,
  classname: PropTypes.string,
  selectClassname: PropTypes.string,
};

export default function Dropdown({
  id,
  value,
  options,
  onChange,
  error = '',
  resetError = () => {},
  title = '',
  indicator = false,
  placeholder = 'Select',
  isMulti = false,
  classname = '',
  selectClassname = '',
}) {
  const selectComponents = indicator
    ? { IndicatorSeparator: () => null }
    : {
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
      };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: 'black',
      backgroundColor: state.isSelected
        ? '#f1f1f1'
        : state.isFocused
        ? '#f1f1f1'
        : 'white',
      margin: '0px',
      fontWeight: '400',
    }),
    control: (provided, state) => ({
      ...provided,
      borderColor: '#c7c7c7',
      borderWidth: '1.5px',
      minHeight: '40px',
      fontWeight: '400',
    }),
    menuList: (provided, state) => ({
      ...provided,
      padding: '0px',
      borderRadius: '5px',
      maxHeight: '200px',
    }),
    menu: (provided, state) => ({
      ...provided,
      marginTop: '5px',
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: '#c7c7c7',
    }),
  };

  const Header = () => (
    <div className={styles.header}>
      <p className={styles.title}>{title}</p>
      {error && <ErrorMessage error={error} data-testid={error} />}
    </div>
  );

  return (
    <div className={`${styles.container} ${classname}`}>
      {title && <Header />}
      <Select
        id={id}
        className={`${styles.customSelect} ${selectClassname}`}
        components={selectComponents}
        value={value}
        options={options}
        onChange={(option) => {
          resetError();
          onChange(option);
        }}
        placeholder={placeholder}
        styles={customStyles}
        isMulti={isMulti}
      />
    </div>
  );
}
