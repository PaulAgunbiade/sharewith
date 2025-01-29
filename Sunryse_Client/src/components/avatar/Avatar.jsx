import PropTypes from 'prop-types';
import styles from './Avatar.module.scss';

Avatar.propTypes = {
  imgUrl: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  initials: PropTypes.string,
  bgColor: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
};

export default function Avatar({
  imgUrl,
  size = 'small',
  initials,
  bgColor,
  width,
  height,
}) {
  return (
    <div
      className={` ${styles.avatar} ${styles[size]}`}
      style={{ backgroundColor: bgColor, width, height }}
    >
      {imgUrl ? <img src={imgUrl} alt="Avatar" /> : <span>{initials}</span>}
    </div>
  );
}
