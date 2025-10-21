# 2583 Scouting App

### What does it do?
This scouting app directly uploads your team's scouting data to a master sheet using Google's app scripts. Additonally it can be installed locally as a PWA for comps where you have poor connection.

## Setup

 - Clone the repo
 - Create a new spreadsheet in Google Sheets and add a sheet called "Raw Data"
 - Navigate to: Extensions -> App Scripts
 - Create a new script using the code in google-app-script.js
 - Deploy the script
 - Create and configure the .env file with your web app url given by Google:
    ```
    .env

    REACT_APP_GOOGLE_SCRIPT_URL= # your app script url here
    ```
 - Nagivate to the root and run the build command `npm run build`
 - Deploy this build using a host of your choice
 - Done!

## 

![img 1](/app2.png)
![img 2](/app.png)