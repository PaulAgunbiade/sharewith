import { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './TextField.module.scss';

TextField.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  showMaxLength: PropTypes.bool,
  maxLength: PropTypes.number,
  showSubTitle: PropTypes.bool,
  subTitle: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
};

export default function TextField({
  value,
  setValue,
  placeholder = 'Type here...',
  showMaxLength = true,
  maxLength = 100,
  showSubTitle = false,
  subTitle = '',
  title = '',
  className = '',
}) {
  const [charsUsed, setCharsUsed] = useState(value.length);

  return (
    <div className={`${styles.container} ${className}`}>
      <p className={styles.sectionTitle}>{title}</p>
      <textarea
        className={styles.textArea}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={(e) => {
          setCharsUsed(e.target.value.length);
          setValue(e.target.value);
        }}
        value={value}
      />
      {showMaxLength && (
        <p className={styles.charLimit}>
          {charsUsed}/{maxLength}
        </p>
      )}
      {showSubTitle && <p className={styles.subTitle}>{subTitle}</p>}
    </div>
  );
}
