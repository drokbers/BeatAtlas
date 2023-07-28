<template>
  <div class="bg-black relative  shadow-2xl h-[650px] rounded-lg w-[400px]">
    <button
      class="absolute -top-6 -left-5 rounded-full p-3 w-14"
      @click="close"
    >
      <img class="" src="/icons/close.png" />
    </button>
    <form
      @submit.prevent="submitForm"
      class="flex flex-col absolute  z-40 h-[500px] w-[376px] m-3 gap-5"
    >
      <div>
        <h3 class="block mb-3 font-semibold mt-5 text-white">
          Name of the Club?
        </h3>
        <input
          type="text"
          v-model="formData.clubName"
          :class="inputStyles"
          placeholder="Name of the Club"
          required
        />
      </div>

      <div id="location" class="flex flex-col gap-2 w-full">
        <h3 class="block mb-1 font-semibold text-white">Location</h3>

        <select
          id="countries"
          :class="inputStyles"
          v-model="formData.selectedCountry"
          @change="getCities"
        >
          <option
            v-for="country in countries"
            :key="country.id"
            :value="country.id"
          >
            {{ country.name }}
          </option>
        </select>

        <div v-if="cities.length > 0">
          <select
            id="cities"
            :class="inputStyles"
            v-model="formData.selectedCity"
          >
            <option v-for="city in cities" :key="city.id" :value="city.id">
              {{ city.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="flex flex-col">
        <h3 class="mb-4 font-semibold text-white">
          What kind of music? (Select All)
        </h3>

        <div class="flex flex-wrap gap-1 justify-between">
          <div
            v-for="genre in musicGenres"
            :key="genre.id"
            class="flex w-1/4 items-center"
          >
            <input
              :id="genre.name"
              type="checkbox"
              :value="genre.name"
              v-model="formData.selectedGenres"
              class="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
            />
            <label
              :for="genre.name"
              class="ml-2 text-sm font-medium text-gray-300"
              >{{ genre.name }}</label
            >
          </div>
        </div>
      </div>

      <div id="reason">
        <h3 class="mb-4 font-semibold text-white">Why you like it?</h3>
        <div class="mb-6">
          <input
            v-model="formData.reason"
            type="text"
            id="reason-why"
            class="block w-full p-4 border rounded-lg sm:text-md bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div class="flex justify-center">
        <button
          type="submit"
          class="py-2.5 bg-red-900 px-5 mr-2   w-1/2 text-sm font-medium focus:outline-none rounded-lg border focus:z-10 focus:ring-4 focus:ring-gray-700 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      countries: [],
      cities: [],
      formData: {
        clubName: "",
        selectedGenres: [],
        reason: "",
        selectedCountry: null,
        selectedCity: null,
        loading: false,
      },

      musicGenres: [
        { id: 1, name: "Techno" },
        { id: 2, name: "Acid" },
        { id: 3, name: "House" },
        { id: 4, name: "Deep" },
        { id: 5, name: "Minimal" },
        { id: 6, name: "Trance" },
        { id: 7, name: "Progressive" },
        { id: 8, name: "Industrial" },
        { id: 9, name: "Hard" },
        { id: 10, name: "Berlin" },
      ],
    };
  },
  computed: {
    inputStyles() {
      return "w-full border rounded-lg  focus:border-blue-500 block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 ";
    },
  },

  methods: {
    close() {
      this.$emit("close");
    },
    submitForm() {
      const selectedCityName = this.cities.find(
        (city) => city.id === this.formData.selectedCity
      )?.name;
      const selectedCountryName = this.countries.find(
        (country) => country.id === this.formData.selectedCountry
      )?.name;

      console.log("Selected City:", selectedCityName);
      console.log("Selected Country:", selectedCountryName);

    
      this.formData.city = selectedCityName;
      this.formData.country = selectedCountryName;

      console.log(this.formData);
    },

    getCountries() {
      const overpassQuery =
        '[out:json][timeout:25];area["ISO3166-1"]["admin_level"="2"];out;';
      const headers = {
        "Accept-Language": "en",
      };

      axios
        .post("https://overpass-api.de/api/interpreter", overpassQuery, {
          headers,
        })
        .then((response) => {
          this.countries = response.data.elements.map((country) => ({
            id: country.id,
            name: country.tags.name,
          }));
        })
        .catch((error) => {
          console.error(error);
        });
    },

    getCities() {
      if (this.formData.selectedCountry) {
        const overpassQuery = `[out:json][timeout:25];area(${this.formData.selectedCountry})->.a;node["place"="city"](area.a);out;`;

        axios
          .post("https://overpass-api.de/api/interpreter", overpassQuery)
          .then((response) => {
            this.cities = response.data.elements.map((city) => ({
              id: city.id,
              name: city.tags.name,
            }));
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        this.cities = [];
      }
    },

   
  },

  mounted() {
    this.getCountries();
  },
};
</script>
