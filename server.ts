import app from './src/app'
import config from "config";
import log from "./src/logger"; 
import connect from "./src/db/connect";

process.on('uncaughtException', (err) => {
    console.log(err);
    process.exit(1);
  });


connect();
  const port = config.get("port") as number;
  const host = config.get("host") as string;
  
const server = app.listen(port, host, () => {
  log.info(`Server listing at http://${host}:${port}`);
  console.log(`Server runing on port ${port} (${host})`);

});
process.on('unhandledRejection', (err) => {
  console.log(err);
  server.close(() => {
      process.exit(1);
  });
});