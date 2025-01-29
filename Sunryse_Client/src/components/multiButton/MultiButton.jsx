import { useState } from 'react';
import PropTypes from 'prop-types';
import StyledButton from '../styledButton/StyledButton';

import styles from './MultiButton.module.scss';

MultiButton.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      baseClassname: PropTypes.string,
      selectedClassname: PropTypes.string,
    }),
  ).isRequired,
  selected: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      baseClassname: PropTypes.string,
      selectedClassname: PropTypes.string,
    }),
  ).isRequired,
  setSelected: PropTypes.func,
  multiSelect: PropTypes.bool,
  connectedButtons: PropTypes.bool,
};

export default function MultiButton({
  buttons,
  selected,
  setSelected,
  multiSelect = false,
  connectedButtons = true,
}) {
  const onButtonClick = (button) => {
    let newSelectedArray = selected;
    if (multiSelect) {
      const previouslySelected = selected.find((s) => s.text === button.text);
      if (previouslySelected) {
        newSelectedArray = selected.filter((s) => s.text !== button.text);
      } else {
        newSelectedArray.push(button);
      }

      setSelected(newSelectedArray);
    } else setSelected([button]);
    button.onClick();
  };

  const isSelected = (buttonText) => {
    return selected.find((s) => s.text === buttonText);
  };

  return (
    <div
      className={`${styles.buttonsContainer} ${
        !connectedButtons && styles.spacedButtons
      }`}
    >
      {buttons.map((button) => (
        <StyledButton
          key={button.text}
          text={button.text}
          onClick={() => onButtonClick(button)}
          baseClassname={
            isSelected(button.text)
              ? button.selectedClassname
              : button.baseClassname
          }
        />
      ))}
    </div>
  );
}
