<template>
  <div
    class="bg-black relative shadow-2xl h-[550px] z-50 top-5 rounded-lg w-[400px]"
  >
    <button
      class="absolute -top-6 -left-5 rounded-full p-3 w-14"
      @click="close"
    >
      <img class="" src="/icons/close.png" />
    </button>
    <form
      @submit.prevent="submitForm"
      class="flex flex-col absolute h-[530px] w-[376px] m-3 gap-1 overflow-y-auto"
    >
      <div>
        <h3 class="block mb-3 font-semibold mt-3 text-white">
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
        <h3 class="block font-semibold items-center text-white">Location</h3>

        <select
          id="countries"
          :class="inputStyles"
          v-model="formData.selectedCountry"
          @change="getCities"
          required
        >
          <option
            v-for="country in countries"
            :key="country.id"
            :value="country.id"
          >
            {{ country.name }}
          </option>
        </select>

        <div class="flex justify-center w-full">
          <loading-spinner :loading="loading" v-if="loading" />
        </div>
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

      <div id="genre" class="flex flex-col">
        <h3 class="mb-4 mt-1 font-semibold text-white">
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
              class="w-3 h-3 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
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
        <textarea
          id="message"
          v-model="formData.reason"
          rows="4"
          required
          :class="inputStyles"
          placeholder="Write your thoughts here..."
        ></textarea>
      </div>

      <div id="transportation" class="flex flex-col">
        <h3 class="mb-4 mt-2 font-semibold text-white">
          How you reach there? (Select All)
        </h3>

        <div class="flex flex-wrap gap-1 justify-between">
          <div
            v-for="transportation in transportationTypes"
            :key="transportation.id"
            class="flex w-1/4 items-center"
          >
            <input
              :id="transportation.name"
              type="checkbox"
              :value="transportation.name"
              v-model="formData.selectedTransportion"
              class="w-3 h-3 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
            />
            <label
              :for="transportation.name"
              class="ml-2 text-sm font-medium text-gray-300"
              >{{ transportation.name }}</label
            >
          </div>
        </div>
      </div>
      <div id="waiting">
        <h3 class="mb-4 font-semibold mt-2 text-white">
          Approximately, how long do you usually wait at the entrance?
        </h3>
        <div class="flex flex-wrap gap-1 justify-between">
          <div
            v-for="time in waitingTime"
            :key="time.id"
            class="flex w-1/5 items-center"
          >
            <input
              :id="time.name"
              type="radio"
              required
              :value="time.name"
              v-model="formData.waitingTime"
              class="w-3 h-3 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
            />
            <label
              :for="time.name"
              class="ml-2 text-sm font-medium text-gray-300"
              >{{ time.name }}</label
            >
          </div>
        </div>
      </div>

      <div id="drink">
        <h3 class="mb-4 font-semibold mt-2 text-white">
          What is the approximate cost of the drinks?
        </h3>
        <div class="flex flex-wrap gap-1 justify-between ">
          <div
            v-for="drink in drinkPrice"
            :key="drink.id"
            class="flex w-1/5 items-center"
          >
            <input
              :id="drink.name"
              type="radio"
              :value="drink.name"
              v-model="formData.drinkPrice"
              class="w-3 h-3 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
            />
            <label
              :for="drink.name"
              class="ml-2 text-sm font-medium text-gray-300"
              >{{ drink.name }}</label
            >
          </div>
        </div>
      </div>

      <div class="flex justify-center">
        <button
          type="submit"
          class="py-2.5 mt-3 bg-softRed px-5 mr-2 w-1/2 text-sm font-medium focus:outline-none rounded-lg border focus:z-10 focus:ring-4 focus:ring-gray-700 text-white border-gray-600 hover:text-white hover:bg-gray-700"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner.vue";
import emailjs from "@emailjs/browser";
import { toast } from "vue3-toastify";

import "vue3-toastify/dist/index.css";

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
        selectedTransportion: [],
        drinkPrice:null,
        waitingTime:null,
      },
      loading: false,

      musicGenres: [
        { id: 1, name: "Dark" },
        { id: 2, name: "Acid" },
        { id: 3, name: "House" },
        { id: 4, name: "Deep" },
        { id: 5, name: "Minimal" },
        { id: 6, name: "Trance" },
        { id: 7, name: "Progressive" },
        { id: 8, name: "Industrial" },
        { id: 9, name: "Hard" },
        { id: 10, name: "Berlin" },
        { id: 11, name: "House-Tech" },
        { id: 12, name: "Other" },
      ],
      transportationTypes: [
        { id: 1, name: "Taxi" },
        { id: 2, name: "Bus" },
        { id: 3, name: "Train" },
        { id: 4, name: "Metro" },
        { id: 5, name: "Trams" },
        { id: 6, name: "Other" },
      ],
      drinkPrice: [
       { id: 1, name: "$" },
        { id: 2, name: "$$" },
        { id: 3, name: "$$$" },
        { id: 4, name: "$$$$" },
      ],
      waitingTime: [
       { id: 1, name: "Instantly" },
        { id: 2, name: " 30 min" },
        { id: 3, name: "1 hour" },
        { id: 4, name: "2 hours" },
        { id: 4, name: " 2 +" },
      ],

    };
  },
  computed: {
    inputStyles() {
      return "w-full border rounded-lg  resize-none  focus:border-blue-500 block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 ";
    },
  },
  components: {
    LoadingSpinner,
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

      this.formData.city = selectedCityName;
      this.formData.country = selectedCountryName;

      this.sendEmail();
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
        this.cities = [];
        this.loading = true;
        const overpassQuery = `[out:json][timeout:25];area(${this.formData.selectedCountry})->.a;node["place"="city"](area.a);out;`;

        axios
          .post("https://overpass-api.de/api/interpreter", overpassQuery)
          .then((response) => {
            this.cities = response.data.elements.map((city) => ({
              id: city.id,
              name: city.tags.name,
            }));
            this.loading = false;
          })
          .catch((error) => {
            console.error(error);
            this.loading = false;
          });
      } else {
        this.cities = [];
      }
    },
    sendEmail() {
      const emailData = {
        to: "aksoyserdar9@gmail.com",
        message:
          `Club Name: ${this.formData.clubName}\n` +
          `Location: ${this.formData.country}, ${this.formData.city}\n` +
          `Music Genres: ${this.formData.selectedGenres.join(", ")}\n` +
          `Reason: ${this.formData.reason}\n` +
          `Drink:  ${this.formData.drinkPrice}\n` +
          `Transportion: ${this.formData.selectedTransportion.join(", ")}\n` +
          `WaitingTime:  ${this.formData.waitingTime}\n`
          
      };

      emailjs
        .send(
          import.meta.env.VITE_APP_EMAIL_SERVICE ??
            process.env.VITE_APP_EMAIL_SERVICE,
          import.meta.env.VITE_APP_EMAIL_TEMPLATE ??
            process.env.VITE_APP_EMAIL_TEMPLATE,
          emailData,
          import.meta.env.VITE_APP_EMAIL_PUBLIC_KEY ??
            process.env.VITE_APP_EMAIL_PUBLIC_KEY
        )
        .then((response) => {
          console.log("SUCCESS!", response.status, response.text);
          this.sendingInformationContent = `SUCCESS! Status: ${response.status}, Text: ${response.text}`;
          console.log(emailData.message);
          toast.success("Club sent successfully!", { ltr: true });
        })
        .catch((error) => {
          console.log("FAILED...", error);
          this.sendingInformationContent = `FAILED... ${error}`;
          toast.error("Error occurred while sending Club.", { rtl: true });
          console.log(emailData.message, error);
        });
    },
  },

  mounted() {
    this.getCountries();
  },
};
</script>
