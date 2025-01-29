import { useState } from 'react';

import SetupProfile from './setupProfile/SetupProfile';
import SetupMarketing from './setupMarketing/SetupMarketing';
import SetupBusinessHours from './setupBusinessHours/SetupBusinessHours';
import SetupServices from './setupServices/SetupServices';
import SetupFinances from './setupFinances/SetupFinances';
import ProgressBar from '../../../components/progressBar/ProgressBar';

import styles from './SetupGuide.module.scss';

export default function SetupGuide() {
  const [expanded, setExpanded] = useState([]);

  const progress = localStorage.getItem('setupGuideProgress') || 0;
  const tasksCompleted = Math.floor(progress / 20);

  const incProgress = () => {
    const curr = parseInt(progress) + 20;
    localStorage.setItem('setupGuideProgress', curr.toString());
  };

  const decProgress = () => {
    const curr = progress - 20;
    localStorage.setItem('setupGuideProgress', curr.toString());
  };

  const onStepCheck = (stepId) => {
    const isChecked = localStorage.getItem(stepId);
    if (isChecked === 'true') {
      localStorage.setItem(stepId, 'false');
      decProgress();
    } else {
      localStorage.setItem(stepId, 'true');
      incProgress();
    }
  };

  const expand = (step) => {
    setExpanded((prevExpanded) => {
      if (prevExpanded.includes(step)) {
        return prevExpanded.filter((item) => item !== step);
      } else {
        return [...prevExpanded, step];
      }
    });
  };

  const SetupHeader = () => (
    <div className={styles.setupHeaderContainer}>
      <p className={styles.title}>Setup Guide</p>
      <div className={styles.progressContainer}>
        <p className={styles.progressBarText}>
          {tasksCompleted} out of 5 tasks complete
        </p>
        <div className={styles.progressBar}>
          <ProgressBar progress={parseInt(progress)} />
        </div>
      </div>
    </div>
  );

  const SetupLaunch = () => (
    <div className={styles.setupLaunchContainer}>
      <p className={styles.launchTitle}>Ready to launch</p>
      <p className={styles.launchText}>
        Your new practice will launch after your branding session on June 27th
      </p>
    </div>
  );

  return (
    <>
      <SetupHeader />
      {tasksCompleted === 5 && <SetupLaunch />}
      <div className={styles.setupAccordianContainer}>
        <SetupProfile
          expanded={expanded}
          expand={expand}
          onStepCheck={onStepCheck}
        />
        <SetupMarketing
          expanded={expanded}
          expand={expand}
          onStepCheck={onStepCheck}
        />
        <SetupBusinessHours
          expanded={expanded}
          expand={expand}
          onStepCheck={onStepCheck}
        />
        <SetupServices
          expanded={expanded}
          expand={expand}
          onStepCheck={onStepCheck}
        />
        <SetupFinances
          expanded={expanded}
          expand={expand}
          onStepCheck={onStepCheck}
        />
      </div>
    </>
  );
}
