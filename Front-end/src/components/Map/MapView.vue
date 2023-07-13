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

export default {
  name: "BeatAtlas",
  components: {
    MapPopup,
  },

  data() {
    return {
      dummyList: [
        {
          id: 1,
          name: " Klein Harbiye",
          genre: "Trance, Techno, EDM",
          workhours: { start: "9:00", end: "03:00" },
          location: {
            city: "istanbul",
            country: "Turkey",
            latLng: "40.0052, 39.7179",
          },
          website: "wwww.BeatAtlas.com",
          direction: "222e 32st NYC , NY",
          image: "https://media.timeout.com/images/105562876/image.jpg",
          description:
            "Best underground techno club in the city, Mostly 1 hour line in the door and you should get ticket before go, There is a dress code too, make sure wear black",
        },
        {
          id: 2,
          name: "Basement",
          genre: "Techno",
          workhours: { start: "9:00", end: "03:00" },
          location: {
            city: "istanbul",
            country: "Turkey",
            latLng: "41.0052, 39.7179",
          },
          website: "wwww.BeatAtlas.com",
          direction: "222e 32st NYC , NY",
          image: "https://media.timeout.com/images/105562876/image.jpg",
          description: "Lorem ipsum dolor sit amet",
        },
        {
          id: 1,
          name: " Klein Harbiye",
          genre: "Trance, Techno, EDM",
          workhours: { start: "9:00", end: "03:00" },
          location: {
            city: "istanbul",
            country: "Turkey",
            latLng: "41.0052, 23.7179",
          },
          website: "wwww.BeatAtlas.com",
          direction: "222e 32st NYC , NY",
          image: "https://media.timeout.com/images/105562876/image.jpg",
          description:
            "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet",
        },
        {
          id: 2,
          name: "Kastel",
          genre: "Hiphop",
          workhours: { start: "9:00", end: "03:00" },
          location: {
            city: "istanbul",
            country: "Turkey",
            latLng: "42.0052, 32.7179",
          },
          website: "wwww.BeatAtlas.com",
          direction: "222e 32st NYC , NY",
          image: "https://media.timeout.com/images/105562876/image.jpg",
          description:
            "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet",
        },
        {
          id: 1,
          name: "Klein Harbiye",
          genre: "Trance, Techno, EDM",
          workhours: { start: "9:00", end: "03:00" },
          location: {
            city: "istanbul",
            country: "Turkey",
            latLng: "41.0052, 53.7179",
          },
          website: "wwww.BeatAtlas.com",
          direction: "222e 32st NYC , NY",
          image: "https://media.timeout.com/images/105562876/image.jpg",
          description:
            "Lorem ipsum dolor sit ame Lorem ipsum dolor sit amet Lorem ipsum dolor sit amett",
        },
        {
          id: 2,
          name: "RX",
          genre: "Techno",
          workhours: { start: "9:00", end: "03:00" },
          website: "wwww.BeatAtlas.com",
          direction: "222e 32st NYC , NY",
          location: {
            city: "istanbul",
            country: "Turkey",
            latLng: "41.0052, 43.7179",
          },
          image: "https://media.timeout.com/images/105562876/image.jpg",
          description:
            "Lorem ipsum doloLorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit ametr sit amet",
        },
      ],
      map: null,
      markers: [],
      selectedMarker: null,
    };
  },
  methods: {
    closePopup() {
      this.selectedMarker = null;
    },
  },

  mounted() {
    this.map = L.map("mapContainer").setView([46.05, 11.05], 4);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(this.map);

    var customPane = this.map.createPane("customPane");
    customPane.style.zIndex = 399;

    this.dummyList.forEach((item) => {
      const [lat, lng] = item.location.latLng.split(", ");
      const marker = L.marker([lat, lng]).addTo(this.map);
      marker.on("click", () => {
        this.selectedMarker = item;
      });
      this.markers.push(marker);
    });
    try {
      let a = document.getElementsByClassName("leaflet-control-attribution");
      a[0].remove();
    } catch (error) {
      console.log(error);
    }
  },

  onBeforeUnmount() {
    if (this.map) {
      this.map.remove();
    }
  },
};

//a
</script>

<style>
.leaflet-layer,
.leaflet-control-zoom-in,
.leaflet-control-zoom-out,
.leaflet-control-attribution {
  filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(95%);
}
</style>
