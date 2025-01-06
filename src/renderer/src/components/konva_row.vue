<template>
  <v-group
    ref="groupRow"
    :config="configGroup"
    @mouseover="handleMouseOver"
    @mouseout="handleMouseOut"
  >
    <v-rect ref="rect" :config="configRect" />
    <v-text :config="configTextLeft" />
    <v-text :config="configTextRight" />
    <v-circle
      :config="leftCircleConfig"
      @mouseover="handleCircleMouseOver('left')"
      @mouseout="handleCircleMouseOut('left')"
    />
    <v-circle
      :config="rightCircleConfig"
      @mouseover="handleCircleMouseOver('right')"
      @mouseout="handleCircleMouseOut('right')"
    />
  </v-group>
</template>
<script>
const heightHeader = 35
const rowWidth = 250
const rowHeight = 25
export default {
  name: 'KonvaTableRow',
  components: {},
  props: {
    data: {
      type: Object,
      default: () => {
        return undefined
      }
    },
    getConnectors: {
      type: Function
    }
  },
  setup() {},
  data() {
    return {
      rowWidth: rowWidth,
      rowHeight: rowHeight,
      configGroup: {
        x: 0,
        y: heightHeader
      },
      configRect: {
        x: 0,
        y: 0,
        width: rowWidth,
        height: rowHeight,

        fill: !this.isHover ? 'rgb(250, 250, 250)' : 'rgb(25, 250, 250)'
      },
      configTextRight: {
        x: 0,
        y: 0,
        text: this.data?.text_right,
        fontSize: 15,
        fill: 'black',
        width: rowWidth,
        height: rowHeight,
        verticalAlign: 'middle',
        padding: 10
      },
      configTextLeft: {
        x: 0,
        y: 0,
        text: this.data?.text_left,
        fontSize: 15,
        fill: 'black',
        align: 'right',
        width: rowWidth,
        height: rowHeight,
        verticalAlign: 'middle',
        padding: 10
      },
      leftCircleConfig: {
        x: 0,
        y: rowHeight / 2,
        radius: 5,
        fill: '#00000000'
      },
      rightCircleConfig: {
        x: rowWidth,
        y: rowHeight / 2,
        radius: 5,
        fill: '#00000000'
      },
      isHover: false,
      isDragging: false
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.configGroup.y += this.data.index * rowHeight
  },
  methods: {
    handleMouseOut(event) {
      console.log(event)
      const rect = this.$refs.rect.getNode()
      rect.fill('rgb(250, 250, 250)')
      this.isHover = false
      // this.writeMessage('Mouseout triangle');
    },
    handleMouseOver(event) {
      console.log(event)
      const rect = this.$refs.rect.getNode()
      rect.fill('rgb(25, 250, 250)')
      this.isHover = true
    },
    handleCircleMouseOver(position) {
      if (position === 'left') {
        this.leftCircleConfig = {
          ...this.leftCircleConfig,
          radius: 5,
          fill: '#00000080',
          stroke: 'black'
        }
      } else if (position === 'right') {
        this.rightCircleConfig = {
          ...this.rightCircleConfig,
          radius: 5,
          fill: '#00000080',
          stroke: 'black'
        }
      }
    },
    handleCircleMouseOut(position) {
      if (position === 'left') {
        this.leftCircleConfig = {
          ...this.leftCircleConfig,
          radius: 5,
          fill: 'transparent',
          stroke: undefined
        }
      } else if (position === 'right') {
        this.rightCircleConfig = {
          ...this.rightCircleConfig,
          radius: 5,
          fill: 'transparent',
          stroke: undefined
        }
      }
    }
  }
}
</script>
<style scoped></style>
