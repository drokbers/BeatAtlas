<template>
  <div class="list-container h-[600px] w-80 overflow-y-auto">
    <ul class="flex flex-col gap-3">
      <ListItem
        class=""
        v-for="item in dummyList"
        :key="item.id"
        :name="item.name"
        :genre="item.genre"
        :workhours="item.workhours"
        :location="item.location"
        :image="item.image"
        :description="item.description"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import ListItem from './ListItem.vue'

export default {
  components: {
    ListItem
  },
  data() {
    return {
      dummyList: [
        {
          id: 1,
          name: ' Klein Harbiye',
          genre: 'Trance, Techno, EDM',
          workhours: { start: '9:00', end: '03:00' },
          location: { city: 'istanbul', country: 'Turkey', latLng: '40.0052, 39.7179' },
          image: 'https://media.timeout.com/images/105562876/image.jpg',
          description: 'Lorem ipsum dolor sit amet'
        },
        {
          id: 2,
          genre: 'Techno',
          workhours: { start: '9:00', end: '03:00' },
          location: { city: 'istanbul', country: 'Turkey', latLng: '41.0052, 39.7179' },
          image: 'https://media.timeout.com/images/105562876/image.jpg',
          description: 'Lorem ipsum dolor sit amet'
        },
        {
          id: 1,
          name: ' Klein Harbiye',
          genre: 'Trance, Techno, EDM',
          workhours: { start: '9:00', end: '03:00' },
          location: { city: 'istanbul', country: 'Turkey', latLng: '41.0052, 23.7179' },
          image: 'https://media.timeout.com/images/105562876/image.jpg',
          description: 'Lorem ipsum dolor sit amet'
        },
        {
          id: 2,
          name: 'Wolkwagen Arena Maslak ',
          genre: 'Tip 2',
          workhours: { start: '9:00', end: '03:00' },
          location: { city: 'istanbul', country: 'Turkey', latLng: '42.0052, 32.7179' },
          image: 'https://media.timeout.com/images/105562876/image.jpg',
          description: 'Lorem ipsum dolor sit amet'
        },
        {
          id: 1,
          name: 'Klein Harbiye',
          genre: 'Trance, Techno, EDM',
          workhours: { start: '9:00', end: '03:00' },
          location: { city: 'istanbul', country: 'Turkey', latLng: '41.0052, 53.7179' },
          image: 'https://media.timeout.com/images/105562876/image.jpg',
          description: 'Lorem ipsum dolor sit amet'
        },
        {
          id: 2,
          name: 'Öğe 2',
          genre: 'Tip 2',
          workhours: { start: '9:00', end: '03:00' },
          location: { city: 'istanbul', country: 'Turkey', latLng: '41.0052, 43.7179' },
          image: 'https://media.timeout.com/images/105562876/image.jpg',
          description: 'Lorem ipsum dolor sit amet'
        }
      ]
    }
  }
}
</script>
