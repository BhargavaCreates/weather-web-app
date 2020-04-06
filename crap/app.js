const express = require("express");
const https = require("https");
const app = express();

app.get("/",function(req,res){

    const url = "https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=c9daba36712016e5f18ab9a07e60e8d3&units=metric";
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            
            res.write("<h1>The Temperature in Delhi is " + temp + " degree Celcius.</h1>");
            res.write("<p>the weather is currently "+ description+"</p>");
            res.write("<img src="+imageUrl+">");
            res.send();
        })
    })



})

app.listen(8080,function(){
    console.log("server running @ port:8080");
})