import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Placeholder from '../../components/placeholder/Placeholder';
import StyledButton from '../../components/styledButton/StyledButton';
import LoadingHOC from '../../components/loading/LoadingHOC';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useToast from '../../hooks/useToast';
import { getDashboardLink, getStripeStatus } from './financesHelper';
import createAccountLinkUrl from '../home/setupGuide/setupFinances/setupFinancesHelper';

import PaymentsImage from '../../assets/PaymentsImage.png';
import styles from './Finances.module.scss';

Finances.propTypes = {
  setLoading: PropTypes.func.isRequired,
};

function Finances({ setLoading }) {
  const [isStripeActive, setIsStripeActive] = useState(false);

  const axios = useAxiosPrivate();
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const isActive = await getStripeStatus(axios, toast);
      setIsStripeActive(isActive);
      setLoading(false);
    };
    fetchData();
  }, []);

  async function stripeAccountLinkRedirect() {
    const url = await createAccountLinkUrl(axios, toast);
    window.location.replace(url);
  }

  async function stripeDashboardLinkRedirect() {
    const url = await getDashboardLink(axios, toast);
    window.open(url, '_blank');
  }

  return (
    <div id="Finances" className={styles.screen}>
      {isStripeActive ? (
        <div className={styles.container}>
          <img className={styles.image} src={PaymentsImage} />
          <p className={styles.title}>{'Welcome to your finances '}</p>
          <p className={styles.text}>
            {'Click the button to below to launch your finances'}
          </p>
          <StyledButton
            text="Launch Finances"
            onClick={() => stripeDashboardLinkRedirect()}
          />
        </div>
      ) : (
        <Placeholder
          image={PaymentsImage}
          title="Welcome to your finances"
          text="Before you can view your finances, you will need to finish any outstanding Stripe requirements."
          button={true}
          buttonText="Finish Stripe Setup"
          onClick={() => stripeAccountLinkRedirect()}
        />
      )}
    </div>
  );
}

export default LoadingHOC(Finances, 'Finances', false);
