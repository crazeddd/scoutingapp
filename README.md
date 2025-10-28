# 2583 Scouting App

### What does it do?
This is a simple FRC scouting app, it's served as a [PWA](https://www.google.com/search?q=pwa) so you can use it during comps with little or no connection. All data is uploaded directly to Google sheets and is locally stored until then. 

Note that the data sent to sheets is simply dumped in and you must handle the formatting yourself.

### Todo:

 - [ ] Create basic auth for bad requests
 - [ ] Add push notifications?
 - [ ] Redo icon
 - [ ] Redo UI/UX

## Deployment Setup

 - Clone the repo
 - In Google Sheets create a new spreadsheet and add a new sheet called "Raw Data"
 - Navigate to: Extensions -> App Scripts
 - Create a new script using the code provided in app-script.js
 - Deploy the script (using the web app option)
 - Create and configure an .env file with your web app url:
    ```
    VITE_GOOGLE_SCRIPT_URL= #your url here
    ```
 - Nagivate to the project root and run the install and build command `npm i && npm run build`
 - Deploy this build using a host of your choice
 - Done!

## Dev Setup

 - Clone repo
 - Run `npm i` to install dependencies
 - Then run `npm run dev` to start the dev server

For this project you should use node v20 or above.
## 

![img 1](/readme-imgs/app2.png)
![img 2](/readme-imgs/app.png)