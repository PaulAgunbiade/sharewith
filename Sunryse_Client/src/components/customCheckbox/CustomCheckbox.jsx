import PropTypes from "prop-types";
import Checkbox from "@mui/material/Checkbox";

CustomCheckbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
};

export default function CustomCheckbox({checked, onChange = () => {}}) {
  return (
    <Checkbox
      checked={checked}
      onChange={(event) => onChange(event)}
      sx={{
        color: "#ff7073",
        "&.Mui-checked": {
          color: "#ff7073",
        },
      }}
    />
  );
}
