import {useState} from "react";
import PropTypes from "prop-types";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import CustomCheckbox from "../../../../components/customCheckbox/CustomCheckbox";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import StyledButton from "../../../../components/styledButton/StyledButton";

import OneOnOneImage from "../../../../assets/OneOnOneImage.jpeg";
import styles from "./SetupMarketing.module.scss";

SetupMarketing.propTypes = {
  expanded: PropTypes.arrayOf(PropTypes.string).isRequired,
  expand: PropTypes.func.isRequired,
  onStepCheck: PropTypes.func.isRequired,
};

export default function SetupMarketing({expanded, expand, onStepCheck}) {
  const [calendlyOpen, setCalendlyOpen] = useState(false);

  const isChecked = localStorage.getItem("setupGuideMarketingCheck");

  function openSchedule() {
    window.open(
      "https://calendly.com/tanrajdhillon/terra-marketing-call",
      "_blank"
    );
    setCalendlyOpen(true);
  }

  // function CalendlyPopup() {
  //   return (
  //     <div className={styles.calendlyPopup}>
  //       <iframe
  //         src="https://calendly.com/tanrajdhillon/terra-marketing-call"
  //         width="100%"
  //         height="100%"
  //         frameBorder="0"
  //       ></iframe>
  //     </div>
  //   );
  // }

  return (
    <Accordion
      className={
        expanded.includes("step2")
          ? styles.selectedAccord
          : styles.unselectedAccordian
      }
      expanded={expanded.includes("step2")}
      disableGutters
      onChange={() => expand("step2")}
      id="step2"
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <div className={styles.summary}>
          <CustomCheckbox
            checked={isChecked === "true"}
            onChange={() => onStepCheck("setupGuideMarketingCheck")}
          />
          <p className={styles.title}>Personal Marketing Session</p>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className={styles.details}>
          <div className={styles.bulletListContiainer}>
            <p className={styles.subTitle}>
              Book a session with our Clinical-Branding and Website-Design
              experts.
            </p>
            <p className={styles.text}>During the call they will:</p>
            <ul className={styles.bulletList}>
              <li>Identify your your unqiue value</li>
              <li>Gather more information for your custom website</li>
              <li>Explain Sunrye's marketing approach to bring you clients</li>
            </ul>
            <StyledButton
              baseClassname={styles.button}
              text="Book Branding Session"
              onClick={() => openSchedule()}
            />
          </div>
          <img className={styles.image} src={OneOnOneImage} />
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
