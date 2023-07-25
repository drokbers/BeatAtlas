<!-- PhotoSlider.vue -->
<template>
    <div class="">
      <img :src="currentSlide" alt="Slide" class="slide  h-[250px]" />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent( {
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
        console.log('next')
      
      },
      prevSlide(): void {
        this.currentIndex =
          (this.currentIndex - 1 + this.photos.length) % this.photos.length;
          console.log('prev')
      },
    },
  });

  </script>
  