<template>
  <div
    class="flex flex-row  bg-gray-800 bg-opacity-5 rounded-lg border border-gray-700 w-80 h-36 items-center justify-between shadow-md shadow-gray-800"
  >
    <img class="h-36 w-36 p-1 rounded-2xl mr-2" :src="image" alt="{{ name }}" />
    <div id="info" class="flex flex-col w-full gap-1 text-white ">
      <span class="font-bold text-xl"> {{ name }}</span>
      <span class="text-sm"> {{ genre }}</span>
      <span class="text-sm">{{ workhours.start + '-' + workhours.end }}</span>

      <div class="flex items-center gap-1">
        <img class="w-4 h-4" src="../../assets/location.png" />
        <span>{{ location.city +"/" + location.country }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    genre: {
      type: String,
      required: true
    },
    workhours: {
      type: Object,
      required: true,
      validator: (value: { start: string; end: string }) => {
        const { start, end } = value
        const timeRegex = /^([01]\d|2[0-3]):?([0-5]\d)$/

        return timeRegex.test(start) && timeRegex.test(end)
      }
    },
    location: {
      city: {
        type: String,
        required: true
      },
      country: {
        type: String,
        required: true
      },
      latLng: {
        type: String,
        required: true
      }

    },
    image: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }
}
</script>
