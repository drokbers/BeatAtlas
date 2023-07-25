<template>
  <header class="flex bg-black items-center h-20">
    <router-link to="/"><img alt="BeatAtlas logo" class="logo m-4 -mb-6" src="@/assets/logo.svg"    width="300" height="150" /></router-link>

  </header>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'

</script>
