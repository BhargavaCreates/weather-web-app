const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})
app.post("/", function(req,res){

    console.log(req.body);

    const city = req.body.city;
    const unit = req.body.unit;
    const appid = "c9daba36712016e5f18ab9a07e60e8d3";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+appid+"&units="+unit;

    console.log(url);   
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;

            const iconURl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";

            res.write("<h1>The Temperature in "+ city + " is " + temp + " degree Celcius.</h1>");
            res.write("<p>the weather is currently having "+ description+"</p>");
            res.write("<img src="+iconURl+">");
            res.send();
        })

    })
})

app.listen(4040,function(){
    console.log("server running @ port:4040");
})
