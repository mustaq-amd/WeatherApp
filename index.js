let key = "c967d18ee8da9f2252bfd53ada43b0c5";
var imageArr=["https://assets.msn.com/bundles/v1/weather/latest/SunnyDay.svg",
"https://assets.msn.com/bundles/v1/weather/latest/MostlySunnyDay.svg",
"https://assets.msn.com/bundles/v1/weather/latest/SunnyDay.svg",
    "https://assets.msn.com/bundles/v1/weather/latest/MostlySunnyDay.svg",
    "https://assets.msn.com/bundles/v1/weather/latest/Cloudy.svg",
    "https://assets.msn.com/bundles/v1/weather/latest/SunnyDay.svg",
    "https://assets.msn.com/bundles/v1/weather/latest/MostlySunnyDay.svg",
    "https://assets.msn.com/bundles/v1/weather/latest/SunnyDay.svg"]
async function dailydata(lon,lat){   
    try {
        let res=await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,hourly,minutely,alerts&units=metric&appid=${key}`);
        console.log("res : ",res)
    let data= await res.json();
         console.log("data : ",data)
    console.log("data 7",data);
    showDailyData(data);
        
    } catch (error) {
        console.log(error)
        
    }

}

async function getWeatherData() {
    try {
        let city = document.getElementById("city").value;
        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`);
        let data = await res.json();
        console.log("data",data);
        showWeather(data);
        dailydata(data.coord.lon,data.coord.lat)

    } catch (error) {
console.log(error);
    }

}

function showDailyData(data){
    document.getElementById("daysForecast").innerText="7 Days Forecast";
    document.getElementById("forecast").innerHTML="";
    data.daily.map(function(item,index){
        if(index>0){
            let dayname = new Date(item.dt * 1000).toLocaleDateString("en", {
                weekday: "short",
            });
            let date=new Date(item.dt * 1000).getDate();
            let sunrise=`${Math.floor(item.temp.day)}°`;
            let sunset=`${Math.floor(item.temp.night)}°`;

            let div=document.createElement("div");
            div.id="box"
            let p1=document.createElement("p");
            
            let daySpan=document.createElement("span");
            daySpan.innerText=dayname;
            daySpan.style.marginLeft="10px"
            daySpan.style.marginRight="5px"

            let dateSpan=document.createElement("span");
            dateSpan.innerText=date;

            p1.append(daySpan,dateSpan)
            p1.style.marginBottom="0";

            let div1=document.createElement("div");
            div1.className="forecastDiv"

            let div2=document.createElement("div");
            div2.className="dayeve";

            let image=document.createElement("img");
            image.setAttribute("src",imageArr[index])
            console.log(imageArr[index])
            
            image.style.marginLeft="15px"

            let p2=document.createElement("p");
            p2.innerText=sunrise;

            let p3=document.createElement("p");
            p3.innerText=sunset;

            div2.append(p2,p3);
            div1.append(image,div2)

            div.append(p1,div1);

            document.getElementById("forecast").append(div);

            
            

        }
     
    })
}
function showWeather(data) {
    document.querySelector(".main-data").innerHTML="";


    let span=document.createElement("span");
    let info=document.createElement("i");
    info.className="fas fa-info-circle";
    info.style.color="grey";
    info.style.fontSize="12px"
    info.style.marginLeft="3px";
    span.append(info);

    let container=document.createElement("div");
    container.id="container";

    let oneDiv=document.createElement("div");
    oneDiv.className="one";

    let oneP1=document.createElement("p");
    oneP1.textContent="CURRENT WEATHER";

    let oneP2=document.createElement("p");
    oneP2.id="current-time";

    oneDiv.append(oneP1,oneP2);

    let twoDiv=document.createElement("div");
    twoDiv.className="two";

    let image=document.createElement("img");
    image.id="type-icon";


    let threeDiv=document.createElement("div");
    threeDiv.className="three";

    let fourDiv=document.createElement("div");
    fourDiv.className="four";

    let minTemp=document.createElement("div");
    minTemp.className="min-temp";

    let maxTemp=document.createElement("div");
    maxTemp.className="max-temp";

    let wind=document.createElement("div");
    wind.className="wind";

    let cloud=document.createElement("div");
    cloud.className="cloud";

    let sunrise=document.createElement("div");
    sunrise.className="sunrise";

    let sunset=document.createElement("div");
    sunset.className="sunset";

    fourDiv.append(minTemp,maxTemp,wind,cloud,sunrise,sunset);

    var city=data.name
    document.querySelector("#current-location>p").innerText=city;
    oneP2.innerText=getCurrentTime();
    

    let celsius=document.createElement("h2")
    celsius.innerText=data.main.temp;

    let deg=document.createElement("span");
    deg.innerText="°C"
    celsius.append(deg);

    let type=document.createElement("p")
    

    
    let feels_like=document.createElement("p")
    feels_like.innerText=`Feels Like   ${data.main.feels_like}°`
    

    var two=document.createElement("div")
    two.append(type,feels_like)

    twoDiv.append(image,celsius,two);

    var sent=document.createElement("p");
    
    sent.style.margin="0";

    threeDiv.append(sent);

    

    let pmin=document.createElement("p");
    pmin.innerText="Min Temp"
    pmin.appendChild(span);

    let pminvalue=document.createElement("p");
    pminvalue.innerText=`${data.main.temp_min}°`
    minTemp.append(pmin,pminvalue)

    let pmax=document.createElement("p");
    pmax.innerText="Max Temp";
    pmax.append(span);

    let pmaxvalue=document.createElement("p");
    pmaxvalue.innerText=`${data.main.temp_max}°`
    maxTemp.append(pmax,pmaxvalue)

    let pwind=document.createElement("p");
    pwind.innerText="Wind Speed";
    pwind.append(span);
    let pwindvalue=document.createElement("p");
    pwindvalue.innerText=`${data.wind.speed} km/h`
    wind.append(pwind,pwindvalue)

    let pcloud=document.createElement("p");
    pcloud.innerText="Humidity"
    pcloud.append(span);

    let pcloudvalue=document.createElement("p");
    pcloudvalue.innerText=`${data.main.humidity}°`
    cloud.append(pcloud,pcloudvalue)

    let psr=document.createElement("p");
    psr.innerText="Sunrise";
    psr.append(span);
    let psrvalue=document.createElement("p");
    psrvalue.innerText=convertUnix(data.sys.sunrise);
    sunrise.append(psr,psrvalue)

    let pss=document.createElement("p");
    pss.innerText="Sunset";
    pss.append(span);
    let pssvalue=document.createElement("p");
    pssvalue.innerText=convertUnix(data.sys.sunset);
    sunset.append(pss,pssvalue);
    container.append(oneDiv,twoDiv,threeDiv,fourDiv);
    if(data.main.temp < 13){
        console.log("inside....13 54617a")
        container.style.backgroundImage="url('https://assets.msn.com/weathermapdata/1/static/background/v2.0/compactads3/Cloudy 2.png')";
        document.getElementById("main").style.backgroundColor="#465674";
        image.setAttribute("src","https://assets.msn.com/bundles/v1/weather/latest/Cloudy.svg")
        type.innerText="Cloudy";
        sent.innerText=`The skies will be partly cloudy. The low will be${data.main.temp_min}°`;
        document.querySelector(".metadata").style.backgroundColor="#54617a"
        document.getElementById("city").style.backgroundColor="#68748a";
    }
   else if(data.main.temp < 18){
        console.log("inside....")
        container.style.backgroundImage="url('https://assets.msn.com/weathermapdata/1/static/background/v2.0/compactads3/Clear Night.png')";
        document.getElementById("main").style.backgroundColor="#213a60";
        image.setAttribute("src","https://assets.msn.com/bundles/v1/weather/latest/ClearNight.svg")
        type.innerText="Clear";
        sent.innerText=`The skies will be clear. The low will be ${data.main.temp_min}°`;
        document.querySelector(".metadata").style.backgroundColor="#54617a"
        document.getElementById("city").style.backgroundColor="#68748a";
    }
    else if(data.main.temp >18){
        container.style.backgroundImage="url('https://assets.msn.com/weathermapdata/1/static/background/v2.0/compactads3/Sunny.png')";
        document.getElementById("main").style.backgroundColor="#225090";
        image.setAttribute("src","https://assets.msn.com/bundles/v1/weather/latest/MostlySunnyDay.svg")
        type.innerText="Mostly Sunny";
        sent.innerText=`Expect Partly sunny skies. The high will be ${data.main.temp_max}°`;
        document.querySelector(".metadata").style.backgroundColor="#325b8f"
        document.getElementById("city").style.backgroundColor="#4a6e9c";
    }
    document.querySelector(".main-data").append(container);
    
    document.getElementById("gmap_canvas").setAttribute("src",`https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`);
}


function getCurrentTime(){
    var time=new Date().toLocaleTimeString("en-US").split("");
    //console.log(time);
    time.splice(4,3);
    var t=time.join("");
    return t;
}
function convertUnix(unix_timestamp){
    var date = new Date(unix_timestamp * 1000).toLocaleTimeString("en-US").split("");
    date.splice(4,3);
    //console.log("date: ",date);
    var t=date.join("");
    return t;
}

 
