import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

// Increase the request body size as we will send images
app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
// Enable Cross-Origin Resource Sharing
app.use(cors());