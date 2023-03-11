let BACKEND_SERVER = null;
if (process.env.REACT_APP_BACKEND_SERVER) {
  BACKEND_SERVER = process.env.REACT_APP_BACKEND_SERVER;
} else {
  BACKEND_SERVER = "https://incento-backend.vercel.app/api/";
}

export const API_SERVER = BACKEND_SERVER;
