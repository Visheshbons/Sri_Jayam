// Imports all the neccecary data
import express from 'express';
import chalk from 'chalk';
import cookieParser from 'cookie-parser';

// Sets up some variables
const app = express();
const port = process.env.PORT || 3000;
const portForward = false; // Set to true if you want to use port forwarding

export { app, port, portForward, chalk, cookieParser, express };