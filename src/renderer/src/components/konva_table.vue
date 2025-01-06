<template>
  <v-group :config="{ draggable: true }">
    <v-rect
      :config="{
        x: 0,
        y: 0,
        width: 250,
        height: 250,
        fill: 'rgb(250, 250, 250)',
        shadowBlur: 5
      }"
    >
    </v-rect>
    <v-rect
      :config="{
        x: 0,
        y: 0,
        width: 250,
        height: 35,
        fill: data.header.color
      }"
    >
    </v-rect>
    <v-text :config="{ x: 5, y: 10, text: data.header.title, fontSize: 15, fill: '#f0f0f0' }" />
    <KonvaTableRow v-for="(row, rowIndex) in data.rows" :key="rowIndex" :data="row"></KonvaTableRow>
  </v-group>
</template>

<script>
import KonvaTableRow from './konva_row.vue'
export default {
  name: 'KonvaTable',
  components: { KonvaTableRow },
  props: {
    data: {
      type: Object,
      default: () => undefined
    }
  },
  data() {
    return {
      rowHeight: 35,
      tableWidth: 250
    }
  },
  methods: {}
}
</script>

<style scoped></style>
