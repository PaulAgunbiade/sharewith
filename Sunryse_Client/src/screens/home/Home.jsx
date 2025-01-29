import SetupGuide from "./setupGuide/SetupGuide";

import styles from "./Home.module.scss";

export default function Home() {
  return (
    <div className={styles.screen}>
      <div className={styles.setupContainer}>
        <SetupGuide />
      </div>
    </div>
  );
}
