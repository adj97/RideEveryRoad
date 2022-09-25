const dev_build_env = (env_argument: string) => {
  console.log(env_argument)
    const fs = require('fs');
    const writeFile = fs.writeFile;
  // Configure Angular `environment.ts` file path
  var targetPath = './src/environments/environment'
    if (env_argument == "dev"){
      targetPath += '.ts';
    } else if (env_argument == "prod"){
      targetPath += '.prod.ts';
    } else {
      console.log(`Unrecognised env_argument value: '${env_argument}'`)
      return
    }

  // `environment.ts` file structure
    const envConfigFile = `import { iAppClient } from "./interfaces/appclient";
import { iEnvironment } from "./interfaces/environment";

const strava_app_client: iAppClient = {
    id: '${process.env.STRAVA_API_CLIENT_ID}',
    secret: '${process.env.STRAVA_API_CLIENT_SECRET}'
};

export const environment: iEnvironment = {
    production: true,
    app_client: strava_app_client
};`;
    writeFile(targetPath, envConfigFile, (err) => {
      if (err) {
        console.error(err);
        throw err;
      } else {
        console.log(`Angular environment file generated correctly at ${targetPath} \n`);
      }
    });
  };

dev_build_env(process.argv[2]);