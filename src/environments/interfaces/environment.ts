import { iAppClient } from "./appclient";

export interface iEnvironment {
    production: Boolean,
    app_client: iAppClient
}