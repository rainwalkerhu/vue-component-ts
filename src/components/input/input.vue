<template>
  <input type="text" :value="currentValue" />
</template>
<script>
export default {
  name: "iInput",
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      currentValue: this.value
    };
  },
  watch: {
    value(val) {
      this.currentValue = val;
    }
  },
  methods: {}
};
</script>
