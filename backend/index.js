import express, { response } from 'express';
// import { PORT, MONGODB_URL } from './config.js'
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import { Book } from './models/BookModel.js'
const port = process.env.PORT;
import booksRoute from './routes/bookRoute.js'
import cors from 'cors';

const mongodbURI = process.env.MONGODB_URI;


const app = express();

//Middleware for parsing request body
app.use(express.json());

//middleware for handling CORS POLICY
//Option 1: Allow all Origins with default of cors(*)
app.use(cors());

//Option 2: Allow custom origins
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );




// --------------creating route------------------
app.get('/', (req, res) => {
    // console.log(req)
    return res.status(234).send('Welcome');
});

app.use('/books', booksRoute);
//------------------------------------------------------
//Connecting to db using moongose

mongoose.connect(mongodbURI)
.then(() => {
    console.log('App is connected to database');
})
.catch((error) => {
    console.log(error);
});

app.listen(port, () => {
    console.log(`App is listening to Prot: ${port}`)
});