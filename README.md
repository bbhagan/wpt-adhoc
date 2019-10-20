# WebPageTest Adhoc Testing tool

This will run tests against [WebPageTest](https://www.webpagetest.org/) private instance.

## What it does

This tool can run multiple WPT tests at one time, allowing you to compare results of different tests against each other. You can choose which result fields you're interested in and how many tests to run in a group.

## How it does it

It uses the WPT API to submit tests and get results back. There is a middleware Express layer to avoid CORS headers issues.

## Setup requirements

- You'll need a [WebPageTest Server and client](https://github.com/WPO-Foundation). You can implement this in a docker container, on Amazon EC2, Google Cloud, on a spare server, etc. They've made it really easy to deploy a private instance of WPT.
- You'll need node and npm running on your development server (most recent node reccommended.)

## Setup .env for your environment

Modify the .env file at the root of the project to match your settings

## Run the application

You can start up the application in development mode using npm run dev
