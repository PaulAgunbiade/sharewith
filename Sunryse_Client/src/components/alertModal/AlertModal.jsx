import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Link } from 'react-router-dom';

import styles from './AlertModal.module.scss';

AlertModal.propTypes = {
  severity: PropTypes.oneOf,
  text: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
};

export default function AlertModal({ severity, text, linkText }) {
  const SEVERITY_TYPES = {
    ERROR: {
      value: 'error',
      label: 'Error',
    },
    WARNING: {
      value: 'warning',
      label: 'Warning',
    },
  };

  return (
    <Alert severity={SEVERITY_TYPES[severity].value}>
      <AlertTitle>{SEVERITY_TYPES[severity].label}</AlertTitle>
      {text}
      <Link className={styles.link} to="/finances">
        {linkText}
      </Link>
    </Alert>
  );
}
