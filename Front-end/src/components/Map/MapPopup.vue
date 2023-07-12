<template>
  <div
    class="absolute right-1/3  marker:flex flex-row mr-4 rounded-2xl h-[600px] w-[300px] z-30 bg-gray-800 bg-opacity-50 srounded-lg border border-gray-700 items-center shadow-md shadow-gray-800"
  >
    <div class="relative -left-2 -mb-6  -top-3 bg-white rounded-full w-1 h-1 items-center flex justify-center p-3" >
      <button class="text-black" @click="close">X</button>
    </div>

    <div id="foto" class=" ">
      <img class="w-[350px] h-[250px] rounded-2xl mr-2" :src="item.image" :alt="item.name" />
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
        <span>{{ item.workhours.start + '-' + item.workhours.end }}</span>
      </div>

      <div class="flex items-center gap-3">
        <img class="w-5 h-5" src="../../assets/website.png" />
        <span>{{ item.website }}</span>
      </div>

      <div class="flex items-center gap-3">
        <img class="w-5 h-5" src="../../assets/direction.png" />
        <span>{{ item.direction }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    close() {
      this.$emit('close-popup')
    }
  }
}
</script>