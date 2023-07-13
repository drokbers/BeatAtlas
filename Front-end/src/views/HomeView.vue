<template>
  <main class="flex  md:flex-row flex-col  gap-5 p-10">

    <MapView/>
    <ListViewComponent/>
  </main>
</template>

<script lang="ts">
import ListViewComponent from '../components/ListView/ListViewComponent.vue'
import MapView from '../components/Map/MapView.vue'

export default {
  components: {
    ListViewComponent,
    MapView,
  } 
}

</script>
