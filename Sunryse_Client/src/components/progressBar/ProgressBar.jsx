import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import styles from './ProgressBar.module.scss';

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default function ProgressBar({ progress }) {
  return (
    <Box className={styles.box}>
      <LinearProgress
        className={styles.linearProgress}
        variant="determinate"
        value={progress}
        color="inherit"
      />
    </Box>
  );
}
