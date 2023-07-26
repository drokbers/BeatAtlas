<template>
  <div
    class="flex flex-shrink-0 md:h-[600px] md:overflow-y-auto overflow-x-auto overflow-hidden"
  >
    <ul class="flex md:flex-col flex-row gap-3">
      <ListItem
        v-for="club in clubs"
        :key="club.name"
        :club="club"
        @locationListItem="locationDataHandler"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import ListItem from "./ListItem.vue";
import { type IClub } from "../../models/clubs";
import axios from "axios";

export default {
  components: {
    ListItem,
  },

  data() {
    return {
      receivedData: {} as object,
      clubs: [] as IClub[],
    };
  },
  methods: {
    locationDataHandler(data: object) {
      this.receivedData = data;
      this.$emit("locationListView", data);
    },
    async getClubs() {
      try {
        const response = await axios.get(
          "https://beatatlasback-703ab6a22b8d.herokuapp.com/api/"
        );
        this.clubs = response.data;
      } catch (error) {
        console.error("Error:", error);
      }
    },
  },
  async created() {
    await this.getClubs();
  },
};
</script>
