<template>
  <div
    class="flex flex-row absolute  md:right-96 marker:flex md:flex-col md:mr-4 rounded-bl-3xl w-auto h-auto md:h-[600px] md:w-[350px] z-30 bg-gray-800 bg-opacity-50 srounded-lg border border-gray-700 shadow-md shadow-gray-800"
  >
    <button
      class="absolute -right-2 md:-left-5 -mb-6 -top-5 rounded-full p-3 w-14"
      @click="close"
    >
      <img class="" src="/icons/close.png" />
    </button>

    <button
      class="absolute z-index: 3 rotate-180  -right-7 -mb-6 top-28 p-3 button-next w-14"
      @click="nextSlide"
    >
      <img class="" src="/icons/back.png" />
    </button>

    <button
      class="absolute z-index: 5 -left-5 md:-left-7 -mb-6 top-28 p-3 button-prev w-14"
      @click="prevSlide"
    >
      <img class="" src="/icons/back.png" />
    </button>

    <div
      id="foto"
      class="flex h-[275px] justify-center rounded-tl-xl pt-5 pl-2 md:pt-0 md:pl-0"
    >
      <PhotoSlider ref="photoSliderRef" :photos="item.photos" />
    </div>

    <div
      id="info"
      class="flex flex-col overflow-y-auto w-full h-[400px] gap-3 text-white p-5"
    >
      <span class="font-bold text-xl"> {{ item.name }}</span>

      <span class="text-sm"> {{ nullChecker(item.description) }}</span>

      <div class="flex items-center gap-3 overflow-y-auto">
        <img class="w-5 h-5" src="/icons/genre.png" />
        <span>{{ nullChecker(item.genre) }}</span>
      </div>

      <div
        @click="toggleMenu"
        class="flex items-center gap-3 hover:bg-slate-500 hover:cursor-pointer"
      >
        <img class="w-5 h-5 flex-none" src="/icons/clock.png" />
        <span v-if="!showMenu" class="grow">{{
          nullChecker(item.opening_hours.weekday_text[0])
        }}</span>

        <div v-if="showMenu" class="grow">
          <div v-html="nullChecker(formattedWeekdayText)"></div>
        </div>
        <img
          class="w-5 h-5 flex-none"
          :src="showMenu ? iconDropup : iconDropdown"
        />
      </div>

      <div class="flex items-center gap-3 overflow-y-auto">
        <img class="w-5 h-5" src="/icons/website.png" />
        
        
        <a v-if="item.website" :href="item.website" target="_blank">
      <span>{{ nullChecker(item.website) }}</span>
    </a>
  
    <span v-else>{{ nullChecker(item.website) }}</span>
      </div>

      <div class="flex items-center gap-3 hover:bg-slate-500 hover:cursor-pointer">
        <img class="w-5 h-5" src="/icons/direction.png" />
        <a :href="generateGoogleMapsLink(item.geometry.location)" target="_blank">Google Maps
        </a>
      </div>
      <div class="flex items-center gap-3 ">
        <img class="w-5 h-5" src="/icons/phone.png" />
        <a :href="'tel:' + item.international_phone_number">
   
    <span>{{ nullChecker(item.international_phone_number) }}</span>
  </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import PhotoSlider from "./PhotoSlider.vue";
import { type ComponentPublicInstance } from "vue";
import { type IClub } from "../../models/clubs";

interface PhotoSliderType extends ComponentPublicInstance {
  nextSlide: () => void;
  prevSlide: () => void;
}

export default defineComponent({
  name: "MapPopup",
  props: {
    item: {
      type: Object as () => IClub,
      required: true,
    },
  },
  components: {
    PhotoSlider,
  },
  computed: {
    formattedWeekdayText(): string {
      const formatted = this.item.opening_hours.weekday_text.map(
        (day: any) => `${day}<br>`
      );
      return formatted.join("");
    },
  },
  data() {
    return {
      showMenu: <boolean>false,
      iconDropdown: "/icons/dropdown.png",
      iconDropup: "/icons/dropup.png",
    };
  },
  setup() {
    const photoSliderRef = ref<PhotoSliderType | null>(null);
    return {
      photoSliderRef,
    };
  },
  methods: {
    close(): void {
      this.$emit("close-popup");
    },
    nextSlide(): void {
      if (this.photoSliderRef && this.photoSliderRef.nextSlide) {
        this.photoSliderRef.nextSlide();
      }
    },
    prevSlide(): void {
      if (this.photoSliderRef && this.photoSliderRef.prevSlide) {
        this.photoSliderRef.prevSlide();
      }
    },
    toggleMenu(): void {
      this.showMenu = !this.showMenu;
    },
    nullChecker(apiData: any) {
      if (apiData == null) {
        return "N/A";
      } else {
        return `${apiData}`;
      }
    },
    generateGoogleMapsLink(location: { lat: number; lng: number } ) {
      
      
      return `https://www.google.com/maps?q=${location.lat},${location.lng}`;
    },
  },
});
</script>
