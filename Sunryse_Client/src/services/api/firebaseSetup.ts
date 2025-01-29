import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import config from "../../config";

const firebaseConfig = {
  apiKey: config.fbApiKey,
  authDomain: config.fbAuthDomain,
  projectId: config.fbProjectId,
  storageBucket: config.fbStorageBucket,
  messagingSenderId: config.fbMessagingSenderId,
  appId: config.fbAppId,
  measurementId: config.fbMeasurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {analytics};
