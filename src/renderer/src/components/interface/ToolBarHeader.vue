<template>
  <v-app-bar
    ref="dropBar"
    density="compact"
    color="toolbar"
    class="primary--text"
    dark>
    <v-icon class="ml-4" size="x-large" color="white">{{ icon }} </v-icon>
    <v-toolbar-title class="primary-text-1">{{ title }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn
      v-tooltip:bottom="'Réinitialiser'"
      size="x-small"
      icon="mdi-close"
      variant="tonal"
      class="mx-2">
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "ToolBarHeader",
  components: {},
  props: {
    title: { type: String, default: "Title" },
    icon: { type: String, default: "mdi-test-tube" },
  },
  setup() {
    return {};
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>
