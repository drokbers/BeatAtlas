<template class="relative">
  <div id="mapContainer" class="w-full h-[300px] md:h-[600px] z-10"></div>
  <MapPopup
    class="mr-8"
    v-if="selectedMarker"
    :item="selectedMarker"
    @close-popup="closePopup"
  />
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MapPopup from "./MapPopup.vue";
import axios from "axios";

export default {
  name: "BeatAtlas",
  data() {
    return {
      clubs: [],
      map: null,
      markers: [],
      selectedMarker: null,
    };
  },
  components: {
    MapPopup,
  },
  props: {
    locationListView: {
      type: Object,
      required: true,
    },
  },

  methods: {
    closePopup() {
      this.selectedMarker = null;
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
    var customIcon = L.icon({
      iconUrl: "/icons/discoman.gif",
 
      iconSize: [33, 33],
      iconAnchor: [33, 33],
   
    });
    await this.getClubs();
    if (this.clubs.length > 0) {
      this.clubs.forEach((item) => {
        const { lat, lng } = item.geometry.location;
        const marker = L.marker([lat, lng], { icon: customIcon }).addTo(
          this.map
        );
        marker.on("click", () => {
          this.selectedMarker = item;
          console.log(item)
        });
        this.markers.push(marker);
      });
    } else {
      console.log("Data couldnt load");
    }
  },

  mounted() {
    this.map = L.map("mapContainer").setView([46.05, 11.05],2);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(this.map);

    var customPane = this.map.createPane("customPane");
    customPane.style.zIndex = 399;

    try {
      let a = document.getElementsByClassName("leaflet-control-attribution");
      a[0].remove();
    } catch (error) {
      console.log(error);
    }
  },
  watch: {
    locationListView(listItemLocation) {
      var location = listItemLocation.geometry.location;
      if (this.map && location.lat && location.lng) {
        this.map.flyTo([location.lat, location.lng], 7, {
          duration: 3,
          easeLinearity: 0.5,
        });
        setTimeout(() => {
        this.selectedMarker = listItemLocation;
      }, 2500);
      }
    
    },
  },

  onBeforeUnmount() {
    if (this.map) {
      this.map.remove();
    }
  },
};
</script>

<style>
.leaflet-layer,
.leaflet-control-zoom-in,
.leaflet-control-zoom-out,
.leaflet-control-attribution {
  filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(95%);
}
</style>
