<template>
  <div>
    <header class="flex bg-black items-center justify-between h-20">
      <router-link to="/"
        ><img
          alt="BeatAtlas logo"
          class="logo m-4 -mb-6"
          src="@/assets/logo.svg"
          width="300"
          height="150"
      /></router-link>

      <button @click="openPopup" class="py-2.5 bg-red-900 w-36 mr-10 mb-2 text-md font-medium rounded-lg border  focus:z-10 focus:ring-4 focus:ring-gray-700   border-gray-600 text-white hover:bg-gray-700">
        
        Suggest a Club?
      </button>

    </header>
    <RouterView />
        <div v-if="isPopupOpen" class="fixed top-0 left-0 z-20 w-full h-full flex items-center justify-center">
      <ContactFormVue @close="closePopup" />
    </div>
 
  </div>
</template>

<script setup lang="ts">

import { RouterView } from "vue-router";

import { ref } from 'vue';

import ContactFormVue from "./components/ContactForm/ContactForm.vue";





const isPopupOpen = ref(false);

const openPopup = () => {
  isPopupOpen.value = true;
};

const closePopup = () => {
  isPopupOpen.value = false;
};

</script>
