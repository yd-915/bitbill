// importing relevant module
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

// importing routes
import { rateRouter } from './routes/rate.router';
import { billRouter } from './routes/bill.router';


// start an express server
export const app = express();


const corsOptions = {
  origin: 'https://bitbill.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // enable set cookie
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
// middlewares
app.use(express.json());
app.use(morgan('combined'));
app.use(cors());



//routes
app.get('/', (req,res) => {
    res.json("Backend server is Live 👨🏼‍🍳");
})
 
// this is a mockup endpoint

app.use('/rate', rateRouter);

app.use('/bill', billRouter);



