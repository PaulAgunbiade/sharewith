import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import CustomCheckbox from "../../../../components/customCheckbox/CustomCheckbox";
import StyledButton from "../../../../components/styledButton/StyledButton";
import ServicesImage from "../../../../assets/ServicesImage.png";

import styles from "./SetupServices.module.scss";

SetupServices.propTypes = {
  expanded: PropTypes.arrayOf(PropTypes.string).isRequired,
  expand: PropTypes.func.isRequired,
  onStepCheck: PropTypes.func.isRequired,
};

export default function SetupServices({expanded, expand, onStepCheck}) {
  const isChecked = localStorage.getItem("setupProductsCheck");
  const navigate = useNavigate();

  return (
    <Accordion
      className={
        expanded.includes("step4")
          ? styles.selectedAccord
          : styles.unselectedAccordian
      }
      expanded={expanded.includes("step4")}
      disableGutters
      onChange={() => expand("step4")}
      id="step4"
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <div className={styles.summary}>
          <CustomCheckbox
            checked={isChecked === "true"}
            onChange={() => onStepCheck("setupProductsCheck")}
          />
          <p className={styles.title}>Create Your First Service</p>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className={styles.details}>
          <div className={styles.detailsContent}>
            <p className={styles.subTitle}>
              Write descriptions, set durations and pricing for the services you
              will be offering.
            </p>
            <p className={styles.subTitle}>
              We have already created your 15 minute free consultation service!
            </p>
            <StyledButton
              baseClassname={styles.button}
              text="Create A Service"
              onClick={() => navigate("/services")}
            />
          </div>
          <img className={styles.image} src={ServicesImage} />
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
