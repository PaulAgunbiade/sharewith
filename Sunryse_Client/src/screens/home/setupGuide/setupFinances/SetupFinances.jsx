import PropTypes from "prop-types";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import CustomCheckbox from "../../../../components/customCheckbox/CustomCheckbox";
import StyledButton from "../../../../components/styledButton/StyledButton";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useToast from "../../../../hooks/useToast";
import createAccountLinkUrl from "./setupFinancesHelper";
import PaymentsImage from "../../../../assets/PaymentsImage.png";

import styles from "./SetupFinances.module.scss";

SetupFinances.propTypes = {
  expanded: PropTypes.arrayOf(PropTypes.string).isRequired,
  expand: PropTypes.func.isRequired,
  onStepCheck: PropTypes.func.isRequired,
};

export default function SetupFinances({expanded, expand, onStepCheck}) {
  const isChecked = localStorage.getItem("setupGuideFinanceCheck");

  const axios = useAxiosPrivate();
  const toast = useToast();

  async function stripeAccountLinkRedirect() {
    const url = await createAccountLinkUrl(axios, toast);
    window.location.replace(url);
  }
  return (
    <Accordion
      className={
        expanded.includes("step5")
          ? styles.selectedAccord
          : styles.unselectedAccordian
      }
      expanded={expanded.includes("step5")}
      disableGutters
      onChange={() => expand("step5")}
      id="step5"
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <div className={styles.summary}>
          <CustomCheckbox
            checked={isChecked === "true"}
            onChange={() => onStepCheck("setupGuideFinanceCheck")}
          />
          <p className={styles.title}>Set Up Payments</p>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className={styles.details}>
          <div className={styles.detailsContent}>
            <p className={styles.subTitle}>
              Terra Payments is almost ready to go. You just need to provide a
              few details to start getting paid by your clients.
            </p>
            <p className={styles.subTitle}>
              Terra is partnered with Stripe - the world's leading payments
              software.
            </p>
            <StyledButton
              baseClassname={styles.button}
              text="Set Up Payments"
              onClick={() => stripeAccountLinkRedirect()}
            />
          </div>
          <img className={styles.image} src={PaymentsImage} />
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
