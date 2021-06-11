import express from "express";
import config from "config";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import log from "./logger"; 
import connect from "./db/connect";
import routes from "./routes";

const app = express();

//set access token from refres token


//Body parser, reading data from body to req.body
app.use(express.json());

//Helmet helps you secure your Express apps by setting various HTTP headers
//https://helmetjs.github.io/
app.use(helmet());

// sanitizes user-supplied data to prevent MongoDB Operator Injection
// https://www.npmjs.com/package/express-mongo-sanitize
app.use(mongoSanitize());

// NOTE apiCallsLimiter is to limit the number of call per certian time, to prevent spamming.
// if (process.env.NODE_ENV === 'production') {
//     app.use('/api/v1', , apiRoutes);
// } else {
//     app.use('/api/v1', apiRoutes);
// }
app.use(express.urlencoded({ extended: false }));


app.use('/api/v1',routes );


export default app;