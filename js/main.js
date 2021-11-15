// require('dotenv').config();

let apiKey = ApiKey;

let units = "standard";

let imageDiv = document.getElementById('weather-img-container');
let cardText = document.getElementById('card-text');
let statList = document.getElementById('stat-list');

const doAPICall = async (city, fahrenheit) => {
  if(fahrenheit==true){
    units = "imperial";
  }else{
    units = "metric";
  }
  console.log(units);
  let currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  const response = await fetch(currentWeatherURL);
  const data = await response.json();

  let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  const forecastResponse = await fetch(forecastURL);
  const forecastData = await forecastResponse.json();


  // weather appropriate image
  if(document.getElementById("weather-img")){
    let oldImage = document.getElementById("weather-img");
    oldImage.remove();
  }
  let image = document.createElement("img");
  image.classList.add("card-img-top");
  image.setAttribute("id", "weather-img");
  image.style.width = "20vw";
  if(data.weather[0].main=="Clear"){
    image.src="images/clear.jpg";
  }else if(data.weather[0].main=="Clouds"){
    image.src="images/clouds.jpg";
  }else if(data.weather[0].main=="Rain"){
    image.src="images/rain.jpg";
  }
  imageDiv.appendChild(image);


  // weather report title (city name)
  if(document.getElementById("title-text")){
    let oldTitle = document.getElementById("title-text");
    oldTitle.remove();
  }
  let title = document.createElement('h5');
  title.textContent=data.name;
  title.setAttribute("id", "title-text");
  cardText.appendChild(title);


  // set temp description term
  let tempUnits = "Kelvin";
  if(fahrenheit==true){
    tempUnits = "Fahrenheit";
  }else{
    tempUnits = "Celcius";
  }


  // weather description paragraph
  if(document.getElementById("weather-blurb")){
    let oldBlurb = document.getElementById("weather-blurb");
    oldBlurb.remove();
  }
  let blurb = document.createElement("p");
  blurb.setAttribute("id", "weather-blurb");
  blurb.textContent = `Description: ${data.weather[0].description}, current tempurature: ${data.main.temp} degrees ${tempUnits}`;
  cardText.appendChild(blurb);


  // weather stat list
  if(document.getElementById("list-high")){
    let oldHigh = document.getElementById("list-high");
    let oldLow = document.getElementById("list-low");
    let oldHumidity = document.getElementById("list-humidity");
    let old1 = document.getElementById("list-1");
    let old2 = document.getElementById("list-2");
    let old3 = document.getElementById("list-3");
    oldHigh.remove();
    oldLow.remove();
    oldHumidity.remove();
    old1.remove();
    old2.remove();
    old3.remove();
  }
  let high = document.createElement('li');
  let low = document.createElement('li');
  let humidity = document.createElement('li');

  high.textContent=`High: ${data.main.temp_max}`;
  low.textContent=`Low: ${data.main.temp_min}`;
  humidity.textContent=`Humidity: ${data.main.humidity}`;

  high.setAttribute("id", "list-high");
  low.setAttribute("id", "list-low");
  humidity.setAttribute("id", "list-humidity");

  high.classList.add("list-group-item");
  low.classList.add("list-group-item");
  humidity.classList.add("list-group-item");

  statList.appendChild(high);  
  statList.appendChild(low);
  statList.appendChild(humidity);


  // weather forecast
  let DaysFromNow1 = document.createElement('li');
  let DaysFromNow2 = document.createElement('li');
  let DaysFromNow3 = document.createElement('li');

  let data1 = forecastData.list[1];
  let data2 = forecastData.list[2];
  let data3 = forecastData.list[3];

  DaysFromNow1.textContent=`Tommorrow: ${data1.weather[0].main} with a high of ${data1.main.temp_max} and a low of ${data1.main.temp_min}.`;
  DaysFromNow2.textContent=`Day after: ${data2.weather[0].main} with a high of ${data2.main.temp_max} and a low of ${data2.main.temp_min}.`;
  DaysFromNow3.textContent=`Next Day: ${data3.weather[0].main} with a high of ${data3.main.temp_max} and a low of ${data3.main.temp_min}.`;

  DaysFromNow1.setAttribute("id", "list-1");
  DaysFromNow2.setAttribute("id", "list-2");
  DaysFromNow3.setAttribute("id", "list-3");

  DaysFromNow1.classList.add("list-group-item");
  DaysFromNow2.classList.add("list-group-item");
  DaysFromNow3.classList.add("list-group-item");

  statList.appendChild(DaysFromNow1);  
  statList.appendChild(DaysFromNow2);
  statList.appendChild(DaysFromNow3);
}


handleSubmit=()=>{
  let cityInput = document.getElementById('city').value;
  let american = document.getElementById('american-checkbox').checked;


  let data = doAPICall(cityInput, american);
  console.log(data);

}