<!-- PhotoSlider.vue -->
<template>
  <div class="">
    <img :src="currentSlide" alt="Slide" class="slide w-[350px] h-[275px]" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "PhotoSlider",
  props: {
    photos: {
      type: Array as () => string[],
      required: true,
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  computed: {
    currentSlide() {
      return this.photos[this.currentIndex];
    },
  },
  methods: {
    nextSlide(): void {
      this.currentIndex = (this.currentIndex + 1) % this.photos.length;
    },
    prevSlide(): void {
      this.currentIndex =
        (this.currentIndex - 1 + this.photos.length) % this.photos.length;
    },
  },
});
</script>
