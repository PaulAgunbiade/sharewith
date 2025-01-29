import PropTypes from 'prop-types';
import { format } from 'date-fns';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CustomDatePicker.css';

CustomDatePicker.propTypes = {
  value: PropTypes.instanceOf(Date).isRequired,
  setValue: PropTypes.func.isRequired,
  classNames: PropTypes.string,
};

export default function CustomDatePicker({ value, setValue, classNames = '' }) {
  return (
    <DatePicker
      selected={format(value, 'dd MMMM yyyy')}
      onChange={(newDate) => setValue(newDate)}
      calendarClassName="datePicker"
    />
  );
}
