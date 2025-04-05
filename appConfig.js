// Imports all the neccecary data
import express from 'express';
import chalk from 'chalk';
import cookieParser from 'cookie-parser';

// Sets up some variables
const app = express();
const port = process.env.PORT || 3000;
const portForward = false; // Set to true if you want to use port forwarding

const log = (message) => console.log(message);
const info = (message) => console.log(`${chalk.bgCyan.black("Info:")} ${chalk.dim(message)}`);
const err = (message) => console.log(`${chalk.bgRed.yellowBright("Error:")} ${chalk.red(message)}`);
const warn = (message) => console.log(`${chalk.bgYellow.black("Warning:")} ${chalk.yellowBright(message)}`);

const green = chalk.greenBright;

const startTimer = (message) => console.time(message);
const endTimer = (message) => console.timeEnd(message);

// Define the function "getDateAndTime()"
function getDateAndTime() {
    // get current date
    let date_time = new Date();

    // adjust 0 before single digit date
    let date = ("0" + date_time.getDate()).slice(-2);

    // get current month
    let month = ("0" + (date_time.getMonth() + 1)).slice(-2);

    // get current year
    let year = date_time.getFullYear();

    // get current hours
    let hoursRaw = date_time.getHours();
    if (hoursRaw > 12) {
        var hours24 = hoursRaw - 12;
    } else {
        var hours24 = hoursRaw;
    };
    
    if (hours24 < 10) {
        var hours = "0" + hours24;
    } else {
        var hours = hours24;
    };

    // get current minutes
    let minutesRaw = date_time.getMinutes();
    if (minutesRaw < 10) {
        var minutes = "0" + minutesRaw;
    } else {
        var minutes = minutesRaw;
    };

    // get current seconds
    let secondsRaw = date_time.getSeconds();
    if (secondsRaw < 10) {
        var seconds = "0" + secondsRaw;
    } else {
        var seconds = secondsRaw;
    };

    // get AM or PM
    if (hoursRaw > 12) {
        var time = "PM";
    } else if (hoursRaw == 12) {
        var time = "PM";
    } else {
        var time = "AM";
    };

    const dateAndTime = `${date}-${month}-${year} ${hours}:${minutes}:${seconds} ${time}`;

    return dateAndTime;
};

export { app, port, portForward, chalk, cookieParser, express, getDateAndTime, log, err, warn, info, startTimer, endTimer, green };