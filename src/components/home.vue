<template>
  <div class="home">
    <div class="row">
      <div class="col-8 offset-2 search">
        <div class="input-group mb-3">
          <input v-model="location" type="text" class="form-control" placeholder="Enter Location">
          <div class="input-group-append">
            <button @click="updateLocation" class="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
          </div>
        </div>
      </div>
       <div class="col-8 offset-2 text-center " v-if="forecast">
          <div class="card text-white bg-secondary mb-3" >
            <div class="card-header">Current Weather</div>
            <h4>{{forecast.timezone}}</h4>
            <div class="card-body">
              <h4 class="card-title">{{forecast.currently.summary}}</h4>
              <div class="card-text icon-temp">
                <span class="icons">{{icons[forecast.currently.icon]}}</span>
                {{forecast.currently.temperature}}ْ
              </div>
              <div class="card-text">
                {{forecast.currently.precipProbability}}% chance of precipitation
              </div>
             </div>
           </div>
       </div>
    </div>
  </div>
</template>

<script>

import api from '../lib/api'

export default {
   name: 'Home',
  data(){
    return{
      location: localStorage.location||'',
      forecast:null,
      icons: {
        'clear-day': '😐',
        'clear-night': '🌝',
        rain: '☔️',
        snow: '⛄️',
        sleet: '🍦',
        wind: '💨',
        fog: '🐸',
        cloudy: '☁️',
        'partly-cloudy-day': '⛅️',
        'partly-cloudy-night': '🌌',
      },
    };
  },
  mounted(){
   this.loadWeather(localStorage.lat ||'26.254',localStorage.lng||'29.2675')
  },
  methods:{
    loadWeather(lat,lng){
      localStorage.lat=lat;
      localStorage.lng=lng;
       api.getForecast(lat,lng).then(result=>{
        console.log(result);
        this.forecast=result;
    });
    },
    updateLocation(){
      localStorage.location=this.location;
      api.getCordenate(this.location).then(result=>{
        this.loadWeather(result.latitude,result.longitude)
    });
    }
  }
};
</script>

<style>
body{
   font-size: 2em;

}
 .icon-temp{
   font-size: 2em;
 }
 .icons{
   font-size: 2em;

 }
 .search{
   margin-top: 15px;
 }
 .search button{
   color: #df691a;
 }
 /* For mobile phones: */
@media only screen and (max-width: 768px) {
 body{
   font-size: 1.5em;

}
 .icon-temp{
   font-size: 1.5em;
 }
 .icons{
   font-size: 1.5em;

 }
}
@media only screen and (max-width: 600px) {
 body{
   font-size: 1em;

}
 .icon-temp{
   font-size: 1em;
 }
 .icons{
   font-size: 1em;

 }
}

</style>
