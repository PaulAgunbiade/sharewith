import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SunryseLogo from '../../assets/SunryseLogoTallFillWhite.png';
import { getCurrentTab, SIDE_NAV_DATA } from './sideNavbarHelper';
import styles from './SideNavbar.module.scss';

export default function SideNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [tab, setTab] = useState(getCurrentTab(location.pathname));

  useEffect(() => {
    const currentTab = getCurrentTab(location.pathname);
    setTab(currentTab);
  }, [location.pathname]);

  const SideNavOptions = () =>
    SIDE_NAV_DATA.map((sideBar) => {
      const {
        Icon,
        link: { url, label },
      } = sideBar;
      const selected = tab.url === url;
      return (
        <div
          key={label}
          className={`${styles.optionContainer} ${
            selected && styles.optionContainerSelected
          }`}
          onClick={() => navigate(url)}
        >
          <Icon
            fontSize="small"
            {...(sideBar.IconProps && sideBar.IconProps)}
            className={styles.icon}
          />
          <h1 className={styles.iconText}>{label}</h1>
        </div>
      );
    });

  return (
    <div className={styles.sideNavcontainer}>
      <img src={SunryseLogo} className={styles.logoImage} />
      <SideNavOptions />
    </div>
  );
}
