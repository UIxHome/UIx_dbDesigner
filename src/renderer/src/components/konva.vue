<template>
  <div style="width: 100%; height: 100%; position: absolute">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M 8 0 L 0 0 0 8" fill="none" stroke="gray" stroke-width="0.2" />
        </pattern>
        <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
          <rect width="80" height="80" fill="url(#smallGrid)" />
          <path d="M 80 0 L 0 0 0 80" fill="none" stroke="gray" stroke-width="0.5" />
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  </div>

  <v-stage ref="stage" :config="configKonva">
    <v-layer ref="layer">
      <!-- Insérer le composant KonvaTable ici -->
      <KonvaTable :data="tableData"></KonvaTable>
      <KonvaTable :data="tableData2"></KonvaTable>
      <Konva_link v-for="(link, indexLink) in links" :key="indexLink" :data="link"></Konva_link>
    </v-layer>
  </v-stage>
</template>
<script>
import KonvaTable from './konva_table.vue'
import Konva_link from './konva_link.vue'
const width = window.innerWidth
const height = window.innerHeight

export default {
  components: { KonvaTable, Konva_link },
  setup() {},
  data() {
    return {
      configKonva: {
        container: 'app',
        width: width,
        height: height,
        draggable: true
      },
      configBackground: {
        x: 0,
        y: 0,
        width: width,
        height: height,
        fillPatternRepeat: 'repeat-y',
        listening: false
      },
      configCircle: {
        x: 100,
        y: 100,
        radius: 70,
        fill: this.isDragging ? 'green' : 'black',
        stroke: 'black',
        strokeWidth: 4,
        draggable: true
      },
      isDragging: false,
      folder: {
        info: {},
        schemas: [{ props: { name: '', type: '', description: '' }, tables: [] }]
      },
      tableData: {
        uuid: 'test',
        header: { title: 'TEST', color: 'rgb(51, 130, 201)' },
        rows: [
          { index: 0, text_right: 'TEST', text_left: 'integer' },
          { index: 1, text_right: 'TEST', text_left: 'integer' },
          { index: 2, text_right: 'TEST', text_left: 'integer' },
          { index: 3, text_right: 'TEST', text_left: 'integer' },
          { index: 4, text_right: 'TEST', text_left: 'integer' }
        ]
      },
      tableData2: {
        uuid: 'azerty',
        header: { title: 'azerty', color: 'rgb(51, 130, 201)' },
        rows: [
          { index: 0, text_right: 'TEST', text_left: 'integer' },
          { index: 1, text_right: 'TEST', text_left: 'integer' },
          { index: 2, text_right: 'TEST', text_left: 'integer' },
          { index: 3, text_right: 'TEST', text_left: 'integer' },
          { index: 4, text_right: 'TEST', text_left: 'integer' }
        ]
      },
      links: [{ start: 'test-1', end: 'azerty-3' }]
    }
  },
  computed: {},
  watch: {
    line() {
      console.log(this.line)
    }
  },
  mounted() {
    const stage = this.$refs.stage.getNode()
    var scaleBy = 1.1
    stage.on('wheel', (e) => {
      // stop default scrolling
      e.evt.preventDefault()

      var oldScale = stage.scaleX()
      var pointer = stage.getPointerPosition()

      var mousePointTo = {
        x: (pointer.x - stage.x()) / oldScale,
        y: (pointer.y - stage.y()) / oldScale
      }

      // how to scale? Zoom in? Or zoom out?
      let direction = e.evt.deltaY > 0 ? 1 : -1

      // when we zoom on trackpad, e.evt.ctrlKey is true
      // in that case lets revert direction
      if (e.evt.ctrlKey) {
        direction = -direction
      }

      var newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy

      stage.scale({ x: newScale, y: newScale })

      var newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale
      }
      stage.position(newPos)
    })
    const line = this.$refs.line.getNode()
    line.move({ x: 50, y: 50 })
  },
  methods: {
    handleDragStart() {
      this.isDragging = true
    },
    handleDragEnd() {
      this.isDragging = false
    },
    handleMouseOut(event) {
      console.log(event)
      // this.writeMessage('Mouseout triangle');
    },
    handleMouseOver(event) {
      console.log(event)
      //event.currentTarget.fill = 'rgb(25, 250, 250)'
      // const mousePos = this.$refs.stage.getNode().getPointerPosition();
      // const x = mousePos.x - 190;
      // const y = mousePos.y - 40;
      // this.writeMessage('x: ' + x + ', y: ' + y);
    },
    handleMouseDown() {
      this.isDrawing = true
      const pos = this.$refs.stage.getNode().getPointerPosition()
      this.setRecs([...this.recs, { startPointX: pos.x, startPointY: pos.y, width: 0, height: 0 }])
    },
    handleMouseUp() {
      this.isDrawing = false
    },
    setRecs(element) {
      this.recs = element
    },
    handleMouseMove() {
      // no drawing - skipping
      if (!this.isDrawing) {
        return
      }
      // console.log(event);
      const point = this.$refs.stage.getNode().getPointerPosition()
      // handle  rectangle part
      let curRec = this.recs[this.recs.length - 1]
      curRec.width = point.x - curRec.startPointX
      curRec.height = point.y - curRec.startPointY
    }
  }
}
</script>
<style scoped>
.gridCanvas {
  background-image: linear-gradient(
    transparent 5px,
    rgba(220, 220, 200, 0.3) 6px,
    transparent 6px,
    transparent 11px,
    rgba(220, 220, 200, 0.3) 12px,
    transparent 12px,
    transparent 17px,
    rgba(220, 220, 200, 0.3) 18px,
    transparent 18px,
    transparent 23px,
    rgba(220, 220, 200, 0.8) 24px,
    transparent 24px
  );
}
.grandcarreau2 {
  background-image: linear-gradient(
    transparent 5px,
    rgba(220, 220, 200, 0.3) 6px,
    transparent 6px,
    transparent 11px,
    rgba(220, 220, 200, 0.3) 12px,
    transparent 12px,
    transparent 17px,
    rgba(220, 220, 200, 0.3) 18px,
    transparent 18px,
    transparent 23px,
    rgba(220, 220, 200, 0.8) 24px,
    transparent 24px
  );
}
</style>
