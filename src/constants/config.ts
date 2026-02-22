const DEFAULT_API_URL = "http://127.0.0.1:8000/api/v1";

const appEnv = import.meta.env;

export const APP_NAME = appEnv.VITE_APP_NAME ?? "Settle Klinik";

export const BASE_API_URL = appEnv.VITE_BASE_API_URL ?? DEFAULT_API_URL;

/** LOGING */
export const SENTRY_DSN = appEnv.VITE_SENTRY_DSN;
export const GA_ID = appEnv.VITE_GA_ID;

const config = {
    APP_NAME,
    BASE_API_URL,
    SENTRY_DSN,
    GA_ID,
};

export default config;
