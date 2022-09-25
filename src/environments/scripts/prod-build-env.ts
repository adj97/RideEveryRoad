const prod_build_env = () => {
    const fs = require('fs');
    const writeFile = fs.writeFile;
  // Configure Angular `environment.ts` file path
    const targetPath = './src/environments/environment.prod.ts';

  // `environment.ts` file structure
    const envConfigFile = `import { iEnvironment } from "./interfaces/environment";

const strava_app_client = {
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

prod_build_env();