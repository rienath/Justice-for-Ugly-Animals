import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from "mongoose";
import api from "./routes/routes.js";

// Environmental variables
dotenv.config();

// Server configs
const app = express();
app.use(express.json({ limit: '10mb'}))
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(cors());

// Routes
app.use('/api', api);

// Connect to database
const PORT = process.env.PORT || 5100; // Port 5000 already used in macs
mongoose.connect(process.env.MONGODB_URL)
    .then(() => app.listen(PORT, () => console.log(`Server up: http://localhost:${PORT}`)))
    .catch((error) => console.log(`Server down: ${error}`));
