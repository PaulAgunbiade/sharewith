import React from "react";

export default function CustomRecurrence({formData, updateForm}) {
  const [customRecChecked, setCustomRecChecked] = useState(false);

  const repeatOnButtons = getDaysOfWeekButtons(updateForm, styles);

  const getDefaultSelectedDayButton = () => {
    const dayNum = formData.date.getDay();
    const selected = repeatOnButtons.find((rob) => rob.id === dayNum);
    return selected;
  };
  return (
    <>
      <CustomCheckbox
        checked={customRecChecked}
        onChange={() => setCustomRecChecked(!customRecChecked)}
      />
      {customRecChecked && (
        <>
          <div className={styles.formFieldContainer}>
            <p className={styles.recurrenceText}>Repeat every</p>
            <Dropdown
              id={"availabiliy_rec_num"}
              classname={styles.recurrenceNumDropdown}
              options={recurrenceNumOptions}
              value={formData.recurrenceNum}
              onChange={(value) => updateForm("recurrenceNum", value)}
              placeholder="1"
              indicator
            />
            <Dropdown
              id={"availabiliy_rec_freq"}
              classname={styles.recurrenceFreqDropdown}
              options={recurrenceFreqOptions}
              value={formData.recurrenceFreq}
              onChange={(value) => updateForm("recurrenceFreq", value)}
              placeholder="week"
              indicator
            />
          </div>
          {formData.recurrenceFreq === "week" && (
            <div className={styles.formFieldColContainer}>
              <p className={styles.recurrenceText}>Repeat on</p>
              <MultiButton
                buttons={repeatOnButtons}
                selected={[
                  ...formData.daysOfWeek,
                  getDefaultSelectedDayButton(),
                ]}
                setSelected={(value) => updateForm("daysOfWeek", value)}
                multiSelect
                connectedButtons={false}
              />
            </div>
          )}
          <div className={styles.formFieldColContainer}>
            <p className={styles.recurrenceText}>Ends on</p>
            <div className={styles.formFieldContainer} style={{margin: "0px"}}>
              <CalendarIcon className={styles.formIcon} />
              <CustomDatePicker
                value={formData.date}
                setValue={(value) => updateForm("date", value)}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
