import PropTypes from 'prop-types';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CustomSwitch from '../customSwitch/CustomSwitch';
import styles from './Banner.module.scss';

Banner.propTypes = {
  status: PropTypes.bool,
  title: PropTypes.string,
  checkbox: PropTypes.bool,
  onChange: PropTypes.func,
  text: PropTypes.string.isRequired,
  bannerClass: PropTypes.string,
};
export default function Banner({
  status,
  title = '',
  checkbox,
  onChange = () => {},
  text,
  bannerClass,
}) {
  return (
    <div className={`${styles.banner} ${bannerClass}`}>
      {!status && (
        <ErrorOutlineIcon
          sx={{ color: 'red', fontSize: 18, marginRight: '5px' }}
        />
      )}
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <p className={styles.text}>{text}</p>
      </div>
      {checkbox && <CustomSwitch onChange={onChange} />}
    </div>
  );
}
