#!/usr/bin/env node
//load minimist
import minimist from 'minimist';
const args = minimist(process.argv.slice(2));

//load moment
import moment from 'moment-timezone';
const timezone = moment.tz.guess();

// Load fetch
import fetch from 'node-fetch';

let latitude = '35'
if(args.n) {
    latitude = args.n;
}

if(args.s) {
    latitude = args.s;
}

let longitude = '79'
if (args.e) {
    longitude = args.e;
}
if (args.w) {
    longitude = args.w;
}

// Request something
// const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&daily=precipitation_hours&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York');
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&daily=precipitation_hours&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=' + timezone + '');


// Pull data out
const data = await response.json();

console.log(data);

let day = 1; 

if (args.h) {
    try {
        console.log(`
        Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
        -h            Show this help message and exit.
        -n, -s        Latitude: N positive; S negative.
        -e, -w        Longitude: E positive; W negative.
        -z            Time zone: uses tz.guess() from moment-timezone by default.
        -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
        -j            Echo pretty JSON from open-meteo API and exit.
        `);
    } catch(err) {
        process.exitCode = 1;
    } finally {
        process.exitCode = 0;
    }
};

// Log onto STDOUT
if (args.j) {
    try {
        console.log(data);
    } catch(err) {
        process.exitCode = 1;
    } finally {
        process.exitCode = 0;
    }

}


// console.log('Code running'); 
// process.on('exit', function(code) { 
// return console.log(`exiting the code implicitly ${code}`); 
// }); 
