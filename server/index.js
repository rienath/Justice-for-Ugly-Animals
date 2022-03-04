import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from "mongoose";

const app = express();
dotenv.config();

// Increase the request body size as we will send images
app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
// Enable Cross-Origin Resource Sharing
app.use(cors());

// 5000 is used on macs
const PORT = process.env.PORT || 6000;

// Connect to database
mongoose.connect(process.env.MONGODB_URL)
    .then(() => app.listen(PORT, () => console.log(`Server up: http://localhost:${PORT}`)))
    .catch((error) => console.log(`Server down: ${error}`));
