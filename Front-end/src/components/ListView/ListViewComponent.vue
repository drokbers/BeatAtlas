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

export default {
  components: {
    ListItem,
  },

  data() {
    return {
      receivedData: {} as object,
      clubs: [
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
            weekday_text: ["Mon: 9:00 – 03:00", "Tue: 9:00 – 03:00", "Wed: 9:00 – 03:00", "Thu: 9:00 – 03:00", "Fri: 9:00 – 03:00", "Sat: 9:00 – 03:00"],
          },
          description: "Lorem ipsum dolor sit amet",
          geometry: {
            location: { lat: 49.0052, lng: 29.7179 },
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
            weekday_text: ["Mon: 9:00 – 03:00", "Tue: 9:00 – 03:00", "Wed: 9:00 – 03:00", "Thu: 9:00 – 03:00", "Fri: 9:00 – 03:00", "Sat: 9:00 – 03:00"],
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
            weekday_text: ["Mon: 9:00 – 03:00", "Tue: 9:00 – 03:00", "Wed: 9:00 – 03:00", "Thu: 9:00 – 03:00", "Fri: 9:00 – 03:00", "Sat: 9:00 – 03:00"],
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
            weekday_text: ["Mon: 9:00 – 03:00", "Tue: 9:00 – 03:00", "Wed: 9:00 – 03:00", "Thu: 9:00 – 03:00", "Fri: 9:00 – 03:00", "Sat: 9:00 – 03:00"],
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
            weekday_text: ["Mon: 9:00 – 03:00", "Tue: 9:00 – 03:00", "Wed: 9:00 – 03:00", "Thu: 9:00 – 03:00", "Fri: 9:00 – 03:00", "Sat: 9:00 – 03:00"],
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
      ] as IClub[],
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
