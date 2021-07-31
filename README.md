# Weather-Journal App Project
The Weather Journal App is a normal journal app which logs the user's journals coupled with geographical information relative to the user's city. The user should 
enter the zip code every time he needs to write his journal.



The Weather-Journal App takes from the user two inputs (Zip code & his memo content).
From the zip Code the App makes a get Request to an external weather API from the client side (API : openweathermap).
From the API call such details are served in the app alogside the user journal content:
    1-Day status (morning eveneing or afternoon)
    2-City name & Country name
    3-Temperature
    4-Relative Time & Date for the City targeted

According to the Day status the styling theme of the Application changes.
The UI elements change dynamically according to the API data

Output:
    -User Memo content alongside the retrieved api data which includes the relative date, temperature and other details that were mentioned previously.

These Data are then posted to a node server to be saved and to be retrieved at any time inside the application
A get request is then made from the client side to access the data saved in the node server and the data recieved is then displayed at the last entry section.

all route handles inside the Node application are made using express

for technical details read the comments on the code sections 

## Overview
This project requires you to create an asynchronous web app that uses Web API and user data to dynamically update the UI. 

## Instructions
This will require modifying the `server.js` file and the `website/app.js` file. You can see `index.html` for element references, and once you are finished with the project steps, you can use `style.css` to style your application to customized perfection.

## Extras
If you are interested in testing your code as you go, you can use `tests.js` as a template for writing and running some basic tests for your code.
