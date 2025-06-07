// Importing Dependencies
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config({});

// Initializing Express
const app = express();

// Defining a route
/*app.get('/home', (req, res) => {
    return res.status(200).json({
        message: "I am coming from backend",
        success: true
    })
})*/

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configuring CORS
const corsOptions = {
    origin: 'https://jobportal-frontend-43l5.onrender.com',
    credentials: true
}

app.use(cors(corsOptions));
const PORT = process.env.PORT || 3000;

// APIs
app.use('/api/v1/user', userRoute);
app.use('/api/v1/company', companyRoute);
app.use('/api/v1/job', jobRoute);
app.use('/api/v1/application', applicationRoute);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at prt ${PORT}`)
})
