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
let longitude = '79'

let error = false;
// console.log(process.argv)

if (args) {
    if (args.w && args.e) {
        console.log('Cannot specify LATITUDE twice');
        error = true;
    }
    if (args.s && args.n) {
        console.log('Cannot specify LONGITUDE twice');
        error = true;
    }

    else {
        if (args.s) {
            args.s = "-" + args.s;
            longitude = args.s;
        }

        if (args.w) {
            let text = args.w;
            args.w = "-" + args.w;
            // console.log(args.w);
            // if (parseFloat(args.w) > 0 || args.w === true) {
            //     if (args.w === true) {
            //         console.log('Please use \'-w=-xx.xx\' to give the negative number')
            //         error = true;
            //     }
            //     if (parseFloat(args.w) > 0) {
            //         console.log('w should be a negative number');
            //         error = true;
            //     }
            // } else {
            // }
            longitude = args.w;
        }

        if (args.n) {
            latitude = args.n;   
        }

        if (args.e) {
            longitude = args.n;
        }
    }
}


// console.log(args);

// Request something
// const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&daily=precipitation_hours&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York');
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&daily=precipitation_hours&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=' + timezone + '');


// Pull data out
const data = await response.json();

// console.log(data);
let dayPhase = 'tomorrow';

if (args.d != 1) {
    // console.log(data.daily.precipitation_hours);
    // console.log("test")
    const day = args.d;
    if (day > 0) {
        console.log(day);
    }
    if (day == 0) {
        dayPhase = 'today';
    } else if (day > 1) {
        dayPhase = "in " + args.d + " days";
    }
    if (data.daily.precipitation_hours[day] == "0") {
        console.log(`You probably won\'t need your galoshes in ${dayPhase}`);
    } else {
        console.log(`You probably nedd your galoshes ${dayPhase}`);
    }
} else {
    // console.log(data.daily.precipitation_hours);
   
    if (data.daily.precipitation_hours[1] == "0") {
        console.log(`You probably won\'t your galoshes in ${dayPhase}`);
    } else {
        console.log(`You probably need your galoshes ${dayPhase}`);
    }
}

if (args.h) {
    console.log(`
    Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
    -h            Show this help message and exit.
    -n, -s        Latitude: N positive; S negative.
    -e, -w        Longitude: E positive; W negative.
    -z            Time zone: uses tz.guess() from moment-timezone by default.
    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
    -j            Echo pretty JSON from open-meteo API and exit.
    exitcode = 0
    `);   
};

// Log onto STDOUT
if (args.j) {
    try {
        console.log(data);
    } catch(err) {
        process.exitCode = 1;
        // console.log('exitcode = 1');
    } finally {
        process.exitCode = 0;
        // console.lof('exitcode = 0')
    }

}


// console.log('Code running'); 
// process.on('exit', function(code) { 
// return console.log(`exiting the code implicitly ${code}`); 
// }); 
