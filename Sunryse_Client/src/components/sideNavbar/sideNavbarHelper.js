import HomeIcon from '@mui/icons-material/Home';
import CalendarIcon from '@mui/icons-material/Today';
import ClientsIcon from '@mui/icons-material/PeopleAlt';
import Add from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import SellIcon from '@mui/icons-material/Sell';
import CampaignIcon from '@mui/icons-material/Campaign';
import CreditCard from '@mui/icons-material/CreditCard';

export const SIDE_NAV_OPTIONS = {
  HOME: { url: '/home', label: 'Home' },
  CALENDAR: { url: '/calendar', label: 'Calendar' },
  FINANCES: { url: '/finances', label: 'Billing' },
  BUSINESS_HOURS: { url: '/hours', label: 'Clients' },
  SERVICES: { url: '/services', label: 'Services' },
  MARKETING: { url: '/marketing', label: 'Marketing' },
  SUPPORT: { url: '/support', label: 'Support' },
  SETTINGS: { url: '/settings', label: 'Settings' },
};

export function getCurrentTab(currUrl) {
  if (currUrl.includes(SIDE_NAV_OPTIONS.HOME.url)) {
    return SIDE_NAV_OPTIONS.HOME;
  } else if (currUrl.includes(SIDE_NAV_OPTIONS.CALENDAR.url)) {
    return SIDE_NAV_OPTIONS.CALENDAR;
  } else if (currUrl.includes(SIDE_NAV_OPTIONS.BUSINESS_HOURS.url)) {
    return SIDE_NAV_OPTIONS.BUSINESS_HOURS;
  } else if (currUrl.includes(SIDE_NAV_OPTIONS.SERVICES.url)) {
    return SIDE_NAV_OPTIONS.SERVICES;
  } else if (currUrl.includes(SIDE_NAV_OPTIONS.FINANCES.url)) {
    return SIDE_NAV_OPTIONS.FINANCES;
  } else if (currUrl.includes(SIDE_NAV_OPTIONS.MARKETING.url)) {
    return SIDE_NAV_OPTIONS.MARKETING;
  } else if (currUrl.includes(SIDE_NAV_OPTIONS.SUPPORT.url)) {
    return SIDE_NAV_OPTIONS.SUPPORT;
  } else if (currUrl.includes(SIDE_NAV_OPTIONS.SETTINGS.url)) {
    return SIDE_NAV_OPTIONS.SETTINGS;
  }

  return SIDE_NAV_OPTIONS.HOME;
}

export const SIDE_NAV_DATA = [
  {
    link: SIDE_NAV_OPTIONS.HOME,
    Icon: HomeIcon,
  },
  {
    link: SIDE_NAV_OPTIONS.CALENDAR,
    Icon: CalendarIcon,
  },
  {
    link: SIDE_NAV_OPTIONS.FINANCES,
    Icon: CreditCard,
  },
  {
    link: SIDE_NAV_OPTIONS.BUSINESS_HOURS,
    Icon: ClientsIcon,
  },
  {
    link: SIDE_NAV_OPTIONS.SERVICES,
    Icon: SellIcon,
  },
  {
    link: SIDE_NAV_OPTIONS.MARKETING,
    Icon: CampaignIcon,
    IconProps: {
      fontSize: 'medium',
    },
  },
  {
    link: SIDE_NAV_OPTIONS.SUPPORT,
    Icon: Add,
    IconProps: {
      fontSize: 'medium',
    },
  },
  {
    link: SIDE_NAV_OPTIONS.SETTINGS,
    Icon: SettingsIcon,
  },
];
