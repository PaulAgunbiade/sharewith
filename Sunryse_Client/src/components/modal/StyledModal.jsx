import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import StyledButton from '../styledButton/StyledButton';

import styles from './StyledModal.module.scss';

StyledModal.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onContinue: PropTypes.func,
  closeText: PropTypes.string,
  continueText: PropTypes.string,
};

export default function StyledModal({
  title,
  text = '',
  open = false,
  onClose = () => {},
  onContinue = () => {},
  closeText,
  continueText = '',
}) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-30%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => onClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {text}
          </Typography>
          <StyledButton
            baseClassname={styles.closeButton}
            onClick={() => onClose()}
            text={closeText || 'Cancel'}
          />
          {onContinue && (
            <StyledButton
              baseClassname={styles.continueButton}
              onClick={() => onContinue()}
              text={continueText || 'Continue'}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
}
