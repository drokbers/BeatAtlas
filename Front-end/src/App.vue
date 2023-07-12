<template>
  <header class="flex bg-black items-center h-20">
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="50" height="50" />
    <h1 class="text-3xl font-bold text-white">BeatAtlas</h1>
  </header>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'

</script>
