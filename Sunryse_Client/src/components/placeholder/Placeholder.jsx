import PropTypes from 'prop-types';

import styles from './Placeholder.module.scss';
import StyledButton from '../styledButton/StyledButton';

Placeholder.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  button: PropTypes.bool,
  buttonText: PropTypes.string,
  onButtonClick: PropTypes.func,
};

export default function Placeholder({
  image,
  title,
  text,
  button = false,
  buttonText = '',
  onClick = () => {},
}) {
  return (
    <div className={styles.card}>
      <img className={styles.image} src={image} />
      <p className={styles.title}>{title}</p>
      <p className={styles.text}>{text}</p>
      {button && <StyledButton text={buttonText} onClick={() => onClick()} />}
    </div>
  );
}
