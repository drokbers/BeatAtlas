<template>
  <main class="flex md:flex-row flex-col gap-5 p-10">
    <MapView :locationListView="receivedData" />
    <ListViewComponent @locationListView="locationDataHandler" />
  </main>
</template>

<script lang="ts">
import ListViewComponent from "../components/ListView/ListViewComponent.vue";
import MapView from "../components/Map/MapView.vue";

export default {
  components: {
    ListViewComponent,
    MapView,
  },
  data() {
    return {
      receivedData: {} as object,
    };
  },

  methods: {
    locationDataHandler(data: object) {
      this.receivedData = data;
      this.$emit("locationListView", data);
    },
  },
};
</script>
