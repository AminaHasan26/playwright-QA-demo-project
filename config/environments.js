const dotenv = require('dotenv');
const path = require('path');

// Default environment is QA
const env = process.env.ENV || 'qa';

// Only load .env locally if values aren't already provided
if (!process.env.BASE_URL) {
    dotenv.config({
        path: path.resolve(process.cwd(), `.env.${env}`)
    });
}

module.exports = {
    env,
    baseURL: process.env.BASE_URL,
    username: process.env.USERNAME,
    password: process.env.PASSWORD
};

console.log('Environment :', env);
console.log('Base URL    :', process.env.BASE_URL);