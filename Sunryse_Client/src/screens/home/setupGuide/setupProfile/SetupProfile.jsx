import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CustomCheckbox from "../../../../components/customCheckbox/CustomCheckbox";

import StyledButton from "../../../../components/styledButton/StyledButton";

import ProfileSetupImage from "../../../../assets/ProfileSetupImage2.png";
import styles from "./SetupProfile.module.scss";

SetupProfile.propTypes = {
  expanded: PropTypes.arrayOf(PropTypes.string).isRequired,
  expand: PropTypes.func.isRequired,
  onStepCheck: PropTypes.func.isRequired,
};

export default function SetupProfile({expanded, expand, onStepCheck}) {
  const isChecked = localStorage.getItem("setupProfileCheck");

  const navigate = useNavigate();

  return (
    <Accordion
      className={`${styles.topAccordian} ${
        expanded.includes("step1")
          ? styles.selectedAccordian
          : styles.unselectedAccordian
      }`}
      expanded={expanded.includes("step1")}
      disableGutters
      onChange={() => expand("step1")}
      id="step1"
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <div className={styles.summary}>
          <CustomCheckbox
            checked={isChecked === "true"}
            onChange={() => onStepCheck("setupProfileCheck")}
          />
          <h1 className={styles.title}>Practice Name And Details</h1>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className={styles.details}>
          <div className={styles.detailsContent}>
            <p className={styles.subTitle}>
              Name your practice and add your qualification details. You can
              always edit these later on.
            </p>
            <StyledButton
              baseClassname={styles.button}
              text="Name My Practice"
              onClick={() => {
                navigate("/settings");
              }}
            />
          </div>
          <img className={styles.image} src={ProfileSetupImage} />
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
