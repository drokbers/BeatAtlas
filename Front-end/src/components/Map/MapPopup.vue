<template>
  <div
    class="flex flex-row absolute md:right-96 marker:flex md:flex-col md:mr-4 rounded-2xl w-auto h-auto md:h-[600px] md:w-[300px] z-30 bg-gray-800 bg-opacity-50 srounded-lg border border-gray-700 items-center shadow-md shadow-gray-800"
  >
    <button
      class="absolute -right-2 md:-left-5 -mb-6 -top-5 rounded-full p-3 w-14"
      @click="close"
    >
      <img class="" src="../../assets/close.png" />
    </button>

    <button
      class="absolute z-index: 1 rotate-180 -right-7 -mb-6 top-28 p-3 button-next w-14"
      @click="nextSlide"
    >
      <img class="" src="../../assets/back.png" />
    </button>

    <button
      class="absolute z-index: 1 -left-7 -mb-6 top-28 p-3 button-prev w-14"
      @click="prevSlide"
    >
      <img class="" src="../../assets/back.png" />
    </button>

    <div id="foto" class="h-[250px] rounded-2xl mr-2">
      <PhotoSlider ref="photoSliderRef" :photos="item.photos" />
    </div>

    <div id="info" class="flex flex-col w-full gap-3 text-white p-5">
      <span class="font-bold text-xl"> {{ item.name }}</span>

      <span class="text-sm"> {{ item.description }}</span>

      <div class="flex items-center gap-3">
        <img class="w-5 h-5" src="../../assets/genre.png" />
        <span>{{ item.genre }}</span>
      </div>

      <div class="flex items-center gap-3">
        <img class="w-5 h-5" src="../../assets/clock.png" />
        <span>{{ item.workhours.start + "-" + item.workhours.end }}</span>
      </div>

      <div class="flex items-center gap-3">
        <img class="w-5 h-5" src="../../assets/website.png" />
        <span>{{ item.website }}</span>
      </div>

      <div class="flex items-center gap-3">
        <img class="w-5 h-5" src="../../assets/direction.png" />
        <span>{{ item.direction }}</span>
      </div>
      <div class="flex items-center gap-3">
        <img class="w-5 h-5" src="../../assets/phone.png" />
        <span>{{ item.phone }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import PhotoSlider from "./PhotoSlider.vue";
import { type ComponentPublicInstance } from 'vue';


interface PhotoSliderType extends ComponentPublicInstance {
  nextSlide: () => void;
  prevSlide: () => void;
}

export default defineComponent({
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  components: {
    PhotoSlider,
  },
  setup() {
   
    const photoSliderRef = ref<PhotoSliderType | null>(null);
    return {
      photoSliderRef
    }
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
  },
});
</script>
