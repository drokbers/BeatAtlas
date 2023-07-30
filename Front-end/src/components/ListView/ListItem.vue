<template>
  <div
    class="flex w-[300px] md:w-[350px] right-6 flex-row h-36 hover:bg-slate-500 bg-gray-800 bg-opacity-5 rounded-lg border border-gray-700 items-center justify-between shadow-md shadow-gray-800"
    @click="locationHandler"
  >
    <div class="w-72">
      <img
        class="p-1 h-36 w-36 rounded-2xl mr-2"
        :src="club.photos[0]"
        alt="{{ club.name }}"
      />
    </div>

    <div id="info" class="flex flex-col w-full gap-1 text-white">
      <span class="font-bold text-xl">
        {{ capitalizeFirstLetter(club.name) }}</span
      >
      <span class="text-sm"> {{ capitalizeFirstLetter(club.genre) }}</span>

      <div class="flex items-center gap-1">
        <img class="w-4 h-4" src="/icons/location.png" />
        <span>{{
          capitalizeFirstLetter(club.location.city) +
          " / " +
          capitalizeFirstLetter(club.location.country)
        }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { type IClub } from "../../models/clubs";

export default defineComponent({
  props: {
    club: {
      type: Object as () => IClub,
      required: true,
    },
  },

  methods: {
    locationHandler(): void {
      const dataToSend = this.club;
      this.$emit("locationListItem", dataToSend);
      console.log(this.club)
    },
    capitalizeFirstLetter(value: string | string[]) {
      if (!value) return "";

      if (typeof value === "string") {
    
        return value.charAt(0).toUpperCase() + value.slice(1);
      } else if (Array.isArray(value)) {

        return value
          .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
          .join(", ");
      }

      return ""; 
    },
  },
});
</script>
