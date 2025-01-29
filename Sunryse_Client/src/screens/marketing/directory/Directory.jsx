import { useEffect, useState } from 'react';
import Avatar from '../../../components/avatar/Avatar';
import Banner from '../../../components/banner/Banner';
import Article from '../../../components/article/Article';
import StyledButton from '../../../components/styledButton/StyledButton';

import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import useToast from '../../../hooks/useToast';
import { getDirectory } from './directoryHelper';

import directoryImg from '../../../assets/DirectoryImage.png';
import profilePicture from '../../../assets/ProfilePicture.png';
import articleImg from '../../../assets/directoryVideo.png';

import styles from './Directory.module.scss';

const Directory = () => {
  const [directory, setDirectory] = useState({ url: '', status: false });

  const axios = useAxiosPrivate();
  const toast = useToast();

  const article = {
    title: 'Meet Our AI Powered Sunryse Directory',
    description:
      'Clients from across North America visit our directory to be accurately matched with a clinic that works for them. Clients first go through a short clinically-developed quiz. Next, our proprietary AI uses clinic-website data and quiz data to find the best options for the client.',
    img: articleImg,
  };

  useEffect(() => {
    const fetch = async () => {
      const directory = await getDirectory(axios, toast);
      if (directory) setDirectory(directory);
    };
    fetch();
  }, []);

  const Profile = () => (
    <div className={styles.profile}>
      <Avatar imgUrl={profilePicture} size="large" />
      <div className={styles.profileDescription}>
        <p className={styles.clinicName}>Terra Therapy</p>
        <p className={styles.clinicType}>Private Clinic</p>
        <StyledButton text="Edit" baseClassname={styles.button} />
      </div>
    </div>
  );

  const ProfileDetail = () => (
    <div className={styles.profileDetail}>
      <p className={styles.directoryName}>Sunryse Directory</p>
      <a href={`${directory?.url || 'www.therapytoday/terratherapy'}`}>
        www.therapytoday/terratherapy
      </a>
      <p
        className={`${styles.status} ${directory?.status && styles.published}`}
      >
        Published
      </p>
    </div>
  );

  return (
    <div className={styles.screen}>
      {!directory?.status && (
        <Banner
          title="Sunryse Directory Status"
          text=" Your clinic is currently unavailable in the Sunryse Directory and not
          accepting new clients"
          checkbox
          onChange={() => {}}
          status={directory?.status}
        />
      )}
      <div className={styles.card}>
        <p>Profile</p>
        <div className={styles.profileContainer}>
          <Profile />
          <ProfileDetail />
          <img src={directoryImg} alt="Directory search image" />
        </div>
      </div>
      <Article article={article} />
    </div>
  );
};

export default Directory;
