#!/usr/bin/env node

//load moment
import moment from 'moment-timezone';
const timezone = moment.tz.guess();

//load minimist
import minimist from 'minimist';
const args = minimist(process.argv.slice(2));

// console.log(args);

if (args.h) {
    console.log(`
    Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
    -h            Show this help message and exit.
    -n, -s        Latitude: N positive; S negative.
    -e, -w        Longitude: E positive; W negative.
    -z            Time zone: uses tz.guess() from moment-timezone by default.
    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
    -j            Echo pretty JSON from open-meteo API and exit.
    `);
};

// Load fetch
import fetch from 'node-fetch';
// Request something
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=precipitation_hours&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York');
// Pull data out
const data = await response.json();
// Log onto STDOUT
// console.log(data);

// const timezone = moment.tz.guest()

// const [,, ...args] = process.argv;

// console.log(`Hello World ${args}`)
