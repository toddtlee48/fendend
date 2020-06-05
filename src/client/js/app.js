/* Global Variables */
const apiKey = "indians48";
let baseURL = 'http://api.geonames.org/searchJSON?'
let projectData = [];
let lat, lon;

//Dates
let d = new Date();
let now = (d.getMonth() + 1)+'/'+ (d.getDate()-1)+'/'+ d.getFullYear();

//Finding the difference between now and your selected date. 
const daysDifference = (now, date) => Math.ceil(Math.abs(new Date(date) - new Date(now)) / (1000 * 60 * 60 * 24));

//function that includes a promise nested with the additional data
let btn = document.getElementById('generate');
if(btn) {
  btn.addEventListener("click", performAction, false);
	function performAction(e) {
    event.preventDefault(); 
		let city = document.getElementById('city').value;
		let date = document.getElementById('date').value; 
		console.log(date);
		getCity(baseURL, city, apiKey)
		.then(function (data) {
			postData('http://localhost:8000/add', {
        name: data.geonames[0].name,
		    lat: data.geonames[0].lat,
		    lon: data.geonames[0].lng,
      	country: data.geonames[0].countryName,
      	date: date,})
        updateUI('http://localhost:8000/all');
      })
    }
}

//function to fetch geonames data
export const getCity = async (baseURL, city , key) => {
  const response = await fetch(`${baseURL}q=${city}&maxRows=10&username=${apiKey}`);
  try {
    const data = await response.json();
    console.log(data);
    return data;
  } catch(error) {
      console.log('error', error);
    }
}

//Post data grabbing the url information
const postData = async(url = `${baseURL}q=${city}&maxRows=10&username=${apiKey}`, data = {lat, lon}) => {
	const res = await fetch(url, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data), 
		});
		try {
			console.log(res);
		} catch(error) {
			console.log("error", error);
		}
	}

//function to update the UI. 
const updateUI = async (url = '') => {
  const request = await fetch(url);
  try{
    const allData = await request.json();
    console.log(allData);
    name = allData[0].name;
    lat = allData[0].lat;
    lon = allData[0].lon;
  	const unixDate = Math.round(new Date(date.value).getTime()/1000);
    const unixToday = Math.round(new Date().getTime()/1000);
    const unixDaysBtwn = unixDate - unixToday;
    const daysBtwn = Math.round(unixDaysBtwn/86400);
    const countdown = daysBtwn;
    const dayNum = (countdown === 1) ? 'day' : 'days';
    document.getElementById('names').innerHTML = `Name: ${allData[0].name}`;
    const weather_url = `http://localhost:8000/weather/${lat},${lon}`;
    const res = await fetch(weather_url);
    const json = await res.json();
    console.log(json);
    const pixabay_url = `http://localhost:8000/image/${name}`;
    const res_pix = await fetch(pixabay_url);
    const json_pix = await res_pix.json();
    document.getElementById('names').textContent = name;
    document.getElementById('photo').innerHTML = '<img src='+json_pix.image.hits[0].webformatURL+'>';
    document.getElementById('countdown').innerHTML = `Your trip to ${name}, which is departing on ${date.value} is ${countdown} ${dayNum} away!`;
    document.getElementById('currently').innerHTML = `has a current weather of ${json.weather.data[0].weather.description} with a temperature of ${json.weather.data[0].temp} &deg fahrenheit.`;
    console.log(json_pix);
    return allData;
    console.log(allData);
  } catch(error){
    console.log("error", error);
  };
};

//Global variables followed by code block to create a small form and storage of data for to do list. 
const form = document.getElementsByClassName('form')
const ul = document.querySelector('ul')
const button = document.getElementsByClassName('clear')
const input = document.getElementById('item')
let itemsArray = localStorage.getItem('items') ? 

JSON.parse(localStorage.getItem('items')) : []
localStorage.setItem('items', JSON.stringify(itemsArray))
const data = JSON.parse(localStorage.getItem('items'))
const liMaker = text => {
  const li = document.createElement('li')
  li.textContent = text
  ul.appendChild(li)
}

window.onload=function(){
form[0].addEventListener('submit', function(e) {
  e.preventDefault()
   itemsArray.push(input.value)
  localStorage.setItem('items', JSON.stringify(itemsArray))
  liMaker(input.value)
  input.value = ''
})

data.forEach(item => {
  liMaker(item)
})

button[0].addEventListener('click', function() {
  localStorage.clear()
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild)
  }
})
}




























