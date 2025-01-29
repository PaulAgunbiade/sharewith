interface Config {
  env: string;
  apiUrl: string;
  fbApiKey: string;
  fbAuthDomain: string;
  fbProjectId: string;
  fbStorageBucket: string;
  fbMessagingSenderId: string;
  fbAppId: string;
  fbMeasurementId: string;
  sentryDsn: string;
  sentryAuthToken: string;
}

const dev: Config = {
  env: import.meta.env.VITE_NODE_ENV,
  apiUrl: import.meta.env.VITE_DEV_API_URL,
  fbApiKey: import.meta.env.VITE_DEV_FB_API_KEY,
  fbAuthDomain: import.meta.env.VITE_DEV_FB_AUTH_DOMAIN,
  fbProjectId: import.meta.env.VITE_DEV_FB_PROJECT_ID,
  fbStorageBucket: import.meta.env.VITE_DEV_FB_STORAGE_BUCKET,
  fbMessagingSenderId: import.meta.env.VITE_DEV_FB_MESSAGING_SENDER_ID,
  fbAppId: import.meta.env.VITE_DEV_FB_APP_ID,
  fbMeasurementId: import.meta.env.VITE_DEV_FB_MEASUREMENT_ID,
  sentryDsn: "",
  sentryAuthToken: "",
};

const prod: Config = {
  env: import.meta.env.VITE_NODE_ENV,
  apiUrl: import.meta.env.VITE_PROD_API_URL,
  fbApiKey: import.meta.env.VITE_PROD_FB_API_KEY,
  fbAuthDomain: import.meta.env.VITE_PROD_FB_AUTH_DOMAIN,
  fbProjectId: import.meta.env.VITE_PROD_FB_PROJECT_ID,
  fbStorageBucket: import.meta.env.VITE_PROD_FB_STORAGE_BUCKET,
  fbMessagingSenderId: import.meta.env.VITE_PROD_FB_MESSAGING_SENDER_ID,
  fbAppId: import.meta.env.VITE_PROD_FB_APP_ID,
  fbMeasurementId: import.meta.env.VITE_PROD_FB_MEASUREMENT_ID,
  sentryDsn: import.meta.env.VITE_PROD_SENTRY_DSN,
  sentryAuthToken: import.meta.env.VITE_PROD_SENTRY_AUTH_TOKEN,
};

let config: Config;
if (import.meta.env.VITE_NODE_ENV === "production") {
  config = prod;
} else {
  config = dev;
}

export default config;
