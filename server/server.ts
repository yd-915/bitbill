// importing inbuilt http module
import http from "http";

// importing default config
import { defaultConfig } from "./config/config";

// import app
import {app} from './app';

// creating server
const server = http.createServer(app);
const cors = require('cors')

app.use(cors())

//server listen
server.listen(defaultConfig?.PORT, () => {
    console.log(`Listening on port ${defaultConfig?.PORT}`)
})
