/* Global Variables */

//openweathermap api credentials 
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=ef628ccca7235db3f706e1efec5f6e08';
//openweathermap api result 
let openWeatherMapData;
//object to be posted to node (contains the api filtered data)
let objectToCreate = {};
//Theme Selected
let chosenClass = ".App-lightTheme";



//Event Click
document.getElementById("generate").addEventListener("click",generateOutput)


//Main Function
function generateOutput()
{
    //zip Code input
    let zipCode = document.getElementById("zipcode");
    getTemp(baseUrl,apiKey,zipCode.value).then( () => {
       postContent("/postData",objectToCreate)
    }).then(() => {
        //set timeout is added for a slight delay so that the updateUi occurs after the Post request
        setTimeout(updateUi("/getData"),10)
    });

}

//Get the openweather api JSON object using get request
const getTemp = async (url, apiKey, zipCode) => {

    let response = await fetch(url+zipCode+apiKey);    
    try{
        openWeatherMapData = await response.json();
        processData(openWeatherMapData) //Process the openweather api recieved object
    }
    catch(error)
    {
        console.log("Error "+ error);
    }
}

//Post the Processed openweather api object to the endpoint Node server to save it there
const postContent = async (url,data) => {
    
    let response = await fetch(url,{
        method: 'POST',
        credentials: 'same-origin',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    try{
        const data = await response.text();
        console.log(data);
    }
    catch(error)
    {
        console.log("Error "+error);
    }
}

//Update the UI elements with respect to the object Recieved from the Node server
const updateUi = async (url) => {
    let response = await fetch(url);

    try{
        const uiData = await response.json();
        let date = document.getElementById("date");
        let temp = document.getElementById("temp");
        let time = document.getElementById("time");
        let content = document.getElementById("content");
        let salute = document.getElementById("salute");
        let localTime = document.getElementById("local");
        salute.textContent = "Good "+uiData.status+" in "+uiData.city+","+uiData.country;
        date.textContent = "Date: "+uiData.relativeDate;
        temp.textContent = "Tempearature: "+uiData.temp+"K";
        time.textContent = "Time in "+uiData.city+": "+uiData.realtiveTime;
        content.textContent = uiData.content;
        changeTheme(uiData.status); 
        localTime.textContent = "Local Time "+uiData.localTime;
    }
    catch(error)
    {
        console.log("Error "+error);
    }
}

//To Process the API recieved JSON object
function processData(weatherData)
{
    //---------------
       //The main purpose of the processData function is to make use of more api data rather than just temperature!  
    //--------------

    //Get Temperature of the zip code city
    objectToCreate.temp = weatherData.main.temp;
    //Get local Date
    objectToCreate.localTime = new Date().toLocaleTimeString();
    //Get Date relative to the Zip code city
    var relativeDate = new Date((new Date().getTime() + new Date().getTimezoneOffset()*60*1000)+weatherData.timezone*1000)
    objectToCreate.relativeDate = relativeDate.toLocaleDateString();
    var hours = relativeDate.getHours();
    //Get status of the zip code city's day (morning, night)
    objectToCreate.status = checkDay(hours); 
    //Get relative time of the zip code city
    objectToCreate.realtiveTime = relativeDate.toLocaleTimeString();
    let feelings =  document.getElementById("feelings");
    //Get the Journal content
    objectToCreate.content = feelings.value; 
    //Get the Country name
    objectToCreate.country = weatherData.sys.country;
    //Get the Zip code city name
    objectToCreate.city = weatherData.name;
}


//Helper Functions

//checkDay function check the status of the day according to the Hours in the date time
function checkDay(hours)
{
    if(hours >= 6 && hours <= 12)
    {
        return "morning";
    }
    else if(hours >= 13 && hours <= 17)
    {
        return "afternoon";
    }
    else if(hours >= 18 && hours <=24 || hours <=5)
    {
        return "evening";
    }
    else
    {
        return "morning";
    }
}


//This function change the styling theme of the app according to the day 
function changeTheme(status)
{
    let body = document.querySelector("body");     
    let app = document.querySelector(".App");
    //light theme for morning
    if(status == "morning")
    {
        body.style.backgroundImage = "url(src/morning.jpg)";
        app.classList.remove(chosenClass);
        app.classList.add("App-lightTheme");
        chosenClass = "App-lightTheme";
    }
    //light theme for morning
    else if(status == "evening")
    {
        body.style.backgroundImage = "url(src/night.jpg)";
        app.classList.remove(chosenClass);
        app.classList.add("App-darkTheme");
        chosenClass = "App-darkTheme";

    }
    //light theme for afternoon
    else
    {
        body.style.backgroundImage = "url(src/afternoon.jpg)";
        app.classList.remove(chosenClass);
        app.classList.add("App-lightTheme");
        chosenClass = "App-lightTheme";
    }
}