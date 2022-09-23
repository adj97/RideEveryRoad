import { iEnvironment } from "./interfaces/environment";
import { strava_app_client } from "./secrets/strava_app_client";

export const environment: iEnvironment = {
  production: true,
  app_client: strava_app_client
};
