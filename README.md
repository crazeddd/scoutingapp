# 2583 Scouting App

### What does it do?
This scouting app directly uploads your team's scouting data to a master sheet using Google's app scripts. Additonally it can be installed locally as a PWA for comps where you have poor connection.

## Setup

 - Clone the repo
 - In Google Sheets create a new spreadsheet and add a sheet called "Raw Data"
 - Navigate to: Extensions -> App Scripts
 - Create a new script using the code provided in google-app-script.js
 - Deploy the script (using the web app option)
 - Create and configure the .env file with your web app url:
    ```
    .env

    REACT_APP_GOOGLE_SCRIPT_URL= # your app script url here
    ```
 - Nagivate to the project root and run the install and then build command `npm i && npm run build`
 - Deploy this build using a host of your choice
 - Done!

## Dev Setup

 - Clone repo
 - Run `npm i` to install dependencies
 - Then run `npm start` to start the dev server

For this project you should use node v20 or above.
## 

![img 1](/readme-imgs/app2.png)
![img 2](/readme-imgs/app.png)