const proxy = 'https://cors-anywhere.herokuapp.com/';
const API_KEY = '9edc1bfb5823e65ad255dae33035471e';
const API_URL ='https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/a470b5427c601724577e80b8bc4d2d03/';
const GEO_API_URL='https://cors-anywhere.herokuapp.com/https://darksky.net/geo?q='


function getForecast(lat, lng){
   return fetch(`${API_URL}${lat},${lng}`)
    .then(Response=>Response.json()).catch(err => console.log(err) );
    
}
function getCordenate(location){
    return fetch(`${GEO_API_URL}${location}`)
    .then(Response=>Response.json()).catch(err => console.log(err) );
}

export default{
    getForecast,
    getCordenate
}