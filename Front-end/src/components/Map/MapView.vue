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
  data() {
    return {
      dummyList: [
        {
          name: "Klein Harbiye",
          website: "https://example.com",
          location: { city: "istanbul", country: "Turkey" },
          photos: [
            "https://media.timeout.com/images/105562876/image.jpg",
            "https://images.squarespace-cdn.com/content/v1/564845d3e4b03c7db181bd8a/1576350568394-KE25PJ4OGH5MZECK727Q/mimari-ic-mekan-fotograf-cekimi-10.jpg?format=1000w",
          ],
          rating: 4.2,
          genre: "Trance, Techno, EDM",
          opening_hours: {
            open_now: true,
            periods: [],
            weekday_text: [
              "Mon: 9:00 – 03:00",
              "Tue: 9:00 – 03:00",
              "Wed: 9:00 – 03:00",
              "Thu: 9:00 – 03:00",
              "Fri: 9:00 – 03:00",
              "Sat: 9:00 – 03:00",
            ],
          },
          description: "Lorem ipsum dolor sit amet",
          geometry: {
            location: { lat: 40.99506, lng: 39.789701 },
            viewport: { 
              northeast: { lat: 40.99506, lng: 39.789701 },
              southwest: { lat: 40.0052, lng: 38.7179 },
            },
          },
          formatted_address: "Some address",
          formatted_phone_number: "+1234567890",
          international_phone_number: "+0987654321",
        },
        {
          name: "RX",
          website: "https://example.com",
          location: { city: "istanbul", country: "Turkey" },
          photos: [
            "https://media.timeout.com/images/105562876/image.jpg",
            "https://images.squarespace-cdn.com/content/v1/564845d3e4b03c7db181bd8a/1576350568394-KE25PJ4OGH5MZECK727Q/mimari-ic-mekan-fotograf-cekimi-10.jpg?format=1000w",
          ],
          rating: 4.2,
          genre: "Trance, Techno, EDM",
          opening_hours: {
            open_now: true,
            periods: [],
            weekday_text: [
              "Mon: 9:00 – 03:00",
              "Tue: 9:00 – 03:00",
              "Wed: 9:00 – 03:00",
              "Thu: 9:00 – 03:00",
              "Fri: 9:00 – 03:00",
              "Sat: 9:00 – 03:00",
            ],
          },
          description: "Lorem ipsum dolor sit amet",
          geometry: {
            location: { lat: 41.0052, lng: 39.7179 },
            viewport: {
              northeast: { lat: 42.0052, lng: 40.7179 },
              southwest: { lat: 40.0052, lng: 38.7179 },
            },
          },
          formatted_address: "Some address",
          formatted_phone_number: "+1234567890",
          international_phone_number: "+0987654321",
        },

        {
          name: "Basement",
          website: "https://example.com",
          location: { city: "istanbul", country: "Turkey" },
          photos: [
            "https://media.timeout.com/images/105562876/image.jpg",
            "https://images.squarespace-cdn.com/content/v1/564845d3e4b03c7db181bd8a/1576350568394-KE25PJ4OGH5MZECK727Q/mimari-ic-mekan-fotograf-cekimi-10.jpg?format=1000w",
          ],
          rating: 4.2,
          genre: "Trance, Techno, EDM",
          opening_hours: {
            open_now: true,
            periods: [],
            weekday_text: [
              "Mon: 9:00 – 03:00",
              "Tue: 9:00 – 03:00",
              "Wed: 9:00 – 03:00",
              "Thu: 9:00 – 03:00",
              "Fri: 9:00 – 03:00",
              "Sat: 9:00 – 03:00",
            ],
          },
          description: "Lorem ipsum dolor sit amet",
          geometry: {
            location: { lat: 23.0052, lng: 39.7179 },
            viewport: {
              northeast: { lat: 42.0052, lng: 40.7179 },
              southwest: { lat: 40.0052, lng: 38.7179 },
            },
          },
          formatted_address: "Some address",
          formatted_phone_number: "+1234567890",
          international_phone_number: "+0987654321",
        },
        {
          name: "Klein Lotus",
          website: "https://example.com",
          location: { city: "istanbul", country: "Turkey" },
          photos: [
            "https://media.timeout.com/images/105562876/image.jpg",
            "https://images.squarespace-cdn.com/content/v1/564845d3e4b03c7db181bd8a/1576350568394-KE25PJ4OGH5MZECK727Q/mimari-ic-mekan-fotograf-cekimi-10.jpg?format=1000w",
          ],
          rating: 4.2,
          genre: "Trance, Techno, EDM",
          opening_hours: {
            open_now: true,
            periods: [],
            weekday_text: [
              "Mon: 9:00 – 03:00",
              "Tue: 9:00 – 03:00",
              "Wed: 9:00 – 03:00",
              "Thu: 9:00 – 03:00",
              "Fri: 9:00 – 03:00",
              "Sat: 9:00 – 03:00",
            ],
          },
          description: "Lorem ipsum dolor sit amet",
          geometry: {
            location: { lat: 32.0052, lng: 39.7179 },
            viewport: {
              northeast: { lat: 42.0052, lng: 40.7179 },
              southwest: { lat: 40.0052, lng: 38.7179 },
            },
          },
          formatted_address: "Some address",
          formatted_phone_number: "+1234567890",
          international_phone_number: "+0987654321",
        },
        {
          name: "Maslak Harbiye",
          website: "https://example.com",
          location: { city: "istanbul", country: "Turkey" },
          photos: [
            "https://media.timeout.com/images/105562876/image.jpg",
            "https://images.squarespace-cdn.com/content/v1/564845d3e4b03c7db181bd8a/1576350568394-KE25PJ4OGH5MZECK727Q/mimari-ic-mekan-fotograf-cekimi-10.jpg?format=1000w",
          ],
          rating: 4.2,
          genre: "Trance, Techno, EDM",
          opening_hours: {
            open_now: true,
            periods: [],
            weekday_text: [
              "Mon: 9:00 – 03:00",
              "Tue: 9:00 – 03:00",
              "Wed: 9:00 – 03:00",
              "Thu: 9:00 – 03:00",
              "Fri: 9:00 – 03:00",
              "Sat: 9:00 – 03:00",
            ],
          },
          description: "Lorem ipsum dolor sit amet",
          geometry: {
            location: { lat: 45.0052, lng: 39.7179 },
            viewport: {
              northeast: { lat: 42.0052, lng: 40.7179 },
              southwest: { lat: 40.0052, lng: 38.7179 },
            },
          },
          formatted_address: "Some address",
          formatted_phone_number: "+1234567890",
          international_phone_number: "+0987654321",
        },
      ],
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
  },

  mounted() {
    this.map = L.map("mapContainer").setView([46.05, 11.05], 4);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(this.map);

    var customPane = this.map.createPane("customPane");
    customPane.style.zIndex = 399;

    var customIcon = L.icon({
      iconUrl: "/icons/disco.png",
      iconSize: [30, 30],
      iconAnchor: [30, 30],
    });

    this.dummyList.forEach((item) => {
      const { lat, lng } = item.geometry.location;
      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(this.map);
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
  watch: {
    locationListView(listItemLocation) {
      if (this.map && listItemLocation.lat && listItemLocation.lng) {
        this.map.flyTo([listItemLocation.lat, listItemLocation.lng], 7, {
          duration: 3,
          easeLinearity: 0.5,
        });
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
