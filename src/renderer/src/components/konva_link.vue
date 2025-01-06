<template>
  <v-path :config="splinePathConfig" />
</template>

<script>
import { line, curveCatmullRom } from 'd3-shape'

export default {
  name: 'KonvaLink',
  components: {},
  props: {
    data: {
      type: Object,
      default: () => undefined
    }
  },
  data() {
    return {
      configKonva: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      splinePathConfig: {
        data: '',
        stroke: 'black',
        strokeWidth: 2
      }
    }
  },
  mounted() {
    this.createSplineCurve([
      [50, 50],
      [70, 200]
    ])
  },
  methods: {
    createSplineCurve(points) {
      // Ajouter des points de contrôle pour les tangences horizontales
      const startX = points[0][0]
      const startY = points[0][1]
      const endX = points[points.length - 1][0]
      const endY = points[points.length - 1][1]

      const controlPointStart = [startX + 50, startY]
      const controlPointEnd = [endX - 50, endY]

      // Ajouter les points de contrôle au début et à la fin
      const adjustedPoints = [
        points[0],
        controlPointStart,
        ...points.slice(1, -1),
        controlPointEnd,
        points[points.length - 1]
      ]

      const splineGenerator = line()
        .curve(curveCatmullRom.alpha(0.8))
        .x((d) => d[0])
        .y((d) => d[1])

      const pathData = splineGenerator(adjustedPoints)
      this.splinePathConfig.data = pathData
    }
  }
}
</script>

<style scoped></style>
