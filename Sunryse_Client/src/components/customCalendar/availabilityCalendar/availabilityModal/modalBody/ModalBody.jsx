import {useState} from "react";
import PropTypes from "prop-types";
import TimeIcon from "@mui/icons-material/AccessTime";
import CalendarIcon from "@mui/icons-material/CalendarToday";

import CustomDatePicker from "../../../../customDatePicker/CustomDatePicker";
import Dropdown from "../../../../dropdown/Dropdown";
import TimeRangeSelector from "../../../../timeRangeSelector/TimeRangeSelector";
import MultiButton from "../../../../multiButton/MultiButton";
import StyledButton from "../../../../styledButton/StyledButton";
import CustomCheckbox from "../../../../customCheckbox/CustomCheckbox";

import {
  recurrenceNumOptions,
  recurrenceFreqOptions,
  getDaysOfWeekButtons,
} from "../availabilityHelper";

import styles from "./ModalBody.module.scss";

ModalBody.propTypes = {
  formData: PropTypes.shape({
    date: PropTypes.instanceOf(Date).isRequired,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    recurrenceNum: PropTypes.number.isRequired,
    recurrenceFreq: PropTypes.string.isRequired,
    daysOfWeek: PropTypes.arrayOf(PropTypes.string).isRequired,
    services: PropTypes.arrayOf(PropTypes.object).isRequired,
    locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  clinicData: PropTypes.shape({
    services: PropTypes.arrayOf(PropTypes.object).isRequired,
    locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  errors: PropTypes.shape({
    timeRange: PropTypes.string.isRequired,
  }).isRequired,
  updateForm: PropTypes.func.isRequired,
  updateErrors: PropTypes.func.isRequired,
};

export default function ModalBody({
  formData,
  clinicData,
  errors,
  updateForm,
  updateErrors,
}) {
  const [customRecChecked, setCustomRecChecked] = useState(false);

  return (
    <div className={styles.modalBody}>
      <div className={styles.formFieldContainer}>
        <CalendarIcon className={styles.formIcon} />
        <CustomDatePicker
          value={formData.date}
          setValue={(value) => updateForm("date", value)}
        />
      </div>
      <p className={styles.timeRangeError}>{errors.timeRange}</p>
      <div className={styles.formFieldContainer}>
        <TimeIcon className={styles.formIcon} />
        <TimeRangeSelector
          startTime={formData.startTime}
          endTime={formData.endTime}
          setStartTime={(value) => updateForm("startTime", value)}
          setEndTime={(value) => updateForm("endTime", value)}
          error={errors.timeRange}
          setError={(e) => updateErrors("timeRange", e)}
        />
      </div>
      {/* <CustomRecurrence /> */}
      <p className={styles.recurrenceHeader}>Services Available</p>
      <Dropdown
        id={"availabiliy_services"}
        classname={styles.recurrenceFreqDropdown}
        options={clinicData.services}
        value={formData.services}
        onChange={(value) => updateForm("services", value)}
        placeholder="Individual Session"
        indicator
        isMulti
      />
      <p className={styles.recurrenceHeader}>Locations Available</p>
      <Dropdown
        id={"availabiliy_locations"}
        classname={styles.recurrenceFreqDropdown}
        options={clinicData.locations}
        value={formData.locations}
        onChange={(value) => updateForm("locations", value)}
        placeholder="Virtual"
        indicator
        isMulti
      />
      <div className={styles.saveButtonContainer}>
        <StyledButton
          baseClassname={styles.saveButton}
          text="Save Availability"
          onClick={() => {}}
        />
      </div>
    </div>
  );
}
