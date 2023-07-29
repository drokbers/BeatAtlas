<!-- app.vue -->
<template>
    <div>
      <div>
        <label>Ülke Seçin:</label>
        <select v-model="selectedCountry" @change="getCities">
          <option v-for="country in countries" :key="country.id" :value="country.id">{{ country.name }}</option>
        </select>
      </div>
  
      <div v-if="cities.length > 0">
        <label>Şehir Seçin:</label>
        <select v-model="selectedCity">
          <option v-for="city in cities" :key="city.id" :value="city.id">{{ city.name }}</option>
        </select>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        countries: [], // Ülkeleri depolayacak dizi
        cities: [], // Şehirleri depolayacak dizi
        selectedCountry: null, // Seçilen ülkeyi depolayacak değişken
        selectedCity: null, // Seçilen şehri depolayacak değişken
      };
    },
    methods: {
      // OpenStreetMap API'den ülkeleri alacak metod
      getCountries() {
        const overpassQuery = '[out:json][timeout:25];area["ISO3166-1"]["admin_level"="2"];out;';
        const headers = {
    'Accept-Language': 'en', // Türkçe dil tercihi için "tr" değeri
  };
  
        axios.post('https://overpass-api.de/api/interpreter', overpassQuery , { headers })
          .then(response => {
            this.countries = response.data.elements.map(country => ({
              id: country.id,
              name: country.tags.name,
            }));
          })
          .catch(error => {
            console.error(error);
          });
      },
      // Seçilen ülkeye göre OpenStreetMap API'den şehirleri alacak metod
      getCities() {
        if (this.selectedCountry) {
          const overpassQuery = `[out:json][timeout:25];area(${this.selectedCountry})->.a;node["place"="city"](area.a);out;`;
  
          axios.post('https://overpass-api.de/api/interpreter', overpassQuery)
            .then(response => {
              this.cities = response.data.elements.map(city => ({
                id: city.id,
                name: city.tags.name,
              }));
            })
            .catch(error => {
              console.error(error);
            });
        } else {
          this.cities = [];
        }
      },
    },
    mounted() {
      this.getCountries(); // Sayfa yüklendiğinde ülkeleri al
    },
  };
  </script>
  
  <style>
  /* Stil vermek için gerekirse bu kısmı kullanabilirsiniz */
  </style>
  