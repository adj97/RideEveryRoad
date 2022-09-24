import { iEnvironment } from "./interfaces/environment";

const strava_app_client = {
  id: `${process.env.STRAVA_API_CLIENT_ID}`,
  secret: `${process.env.STRAVA_API_CLIENT_SECRET}`
}

export const environment: iEnvironment = {
  production: true,
  app_client: strava_app_client
};
