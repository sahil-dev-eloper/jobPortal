// Importing Dependencies
import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from 'path';

dotenv.config({});
connectDB();
const PORT = process.env.PORT || 3000;

// Initializing Express
const app = express();



// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(urlencoded({extended:true}));
app.use(cookieParser());

// Configuring CORS
const corsOptions = {
    origin: ["http://localhost:5173", "https://job-portal-bice-five.vercel.app"],
    credentials: true
}
app.use(cors(corsOptions));


// APIs
app.use('/api/v1/user', userRoute);
app.use('/api/v1/company', companyRoute);
app.use('/api/v1/job', jobRoute);
app.use('/api/v1/application', applicationRoute);



app.listen(PORT, () => {
    console.log(`Server running at prt ${PORT}`)
})