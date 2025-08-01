const env = {
  apiUrl: import.meta.env.VITE_API_URL,
  nodeEnv: import.meta.env.VITE_NODE_ENV,
  appName: import.meta.env.VITE_APP_NAME,
  debug: import.meta.env.VITE_DEBUG,
  platforms: {
    mainUrl: import.meta.env.VITE_MAIN_URL,
    hireUrl: import.meta.env.VITE_HIRE_URL,
    campusUrl: import.meta.env.VITE_CAMPUS_URL,
    careerUrl: import.meta.env.VITE_CAREER_URL,
  },
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID
  },
};

// For Validation Purpose
const getNestedValue = (obj, path) =>
  path.split(".").reduce((acc, key) => acc?.[key], obj);

const validateEnv = (envObj) => {
  const requiredVars = [
    "apiUrl",
    "nodeEnv",
    "appName",
    "debug",
    "platforms.mainUrl",
    "platforms.hireUrl",
    "platforms.campusUrl",
    "platforms.careerUrl",
    "firebase.apiKey",
    "firebase.authDomain",
    "firebase.projectId",
    "firebase.storageBucket",
    "firebase.messagingSenderId",
    "firebase.appId",
    "firebase.measurementId"
  ];

  requiredVars.forEach((key) => {
    if (getNestedValue(envObj, key) === undefined) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  });

  return envObj;
};

const config = validateEnv(env);
export default config;
