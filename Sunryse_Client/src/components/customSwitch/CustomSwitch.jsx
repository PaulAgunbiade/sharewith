import PropTypes from 'prop-types';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { alpha, styled } from '@mui/material/styles';

CustomSwitch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
};

export default function CustomSwitch({ checked, onChange = () => {}, label }) {
  const ColoredSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: '#ff7073',
      '&:hover': {
        backgroundColor: alpha('#ff7073', theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: '#ff7073',
    },
  }));

  return (
    <FormControlLabel
      control={
        <ColoredSwitch
          checked={checked}
          onChange={(event) => onChange(event)}
        />
      }
      label={label}
    />
  );
}
