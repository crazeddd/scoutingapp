# 2583 Scouting App

### What does it do?
This is a simple FRC scouting app, it's served as a <a target="_blank" href="https://www.google.com/search?q=pwa">PWA</a> so you can use it during comps with little or no connection. All data is uploaded directly and foramatted in Google sheets (nice right?) and is locally stored until then. 

### Todo:

 - [x] Create basic auth for bad requests
 - [ ] Add push notifications?
 - [ ] Redo icon
 - [ ] Redo UI/UX

## Deployment Setup

### Getting your sheet setup:
 - In Google Sheets create a new spreadsheet and add a new sheet called "Raw Data", this will be the sheet all your data goes to.
 - Now, navigate to: Extensions -> App Scripts
 - Create a new script using the code provided in app-script.js
 - In this script (line 8) you'll find a placeholder secret, this is for simple auth. Set this value and inform your team of the secret you're using (or just dont use the auth idc).
 - Now deploy the script using the web app option

### Getting the app running:
 - Clone or download the repo
 - Create and configure an .env file in the project root with your web app url:

    ```
    VITE_GOOGLE_SCRIPT_URL= #your url here
    ```
 - Now run the install and build command `npm i && npm run build`
 - Deploy this build using a host of your choice
 - Done!

## Dev Setup

 - Clone repo
 - `npm i` to install dependencies
 - `npm run dev` to start the dev server

I recommend using node v20 or above.
## 

![img 1](/readme-imgs/app2.png)
![img 2](/readme-imgs/app.png)