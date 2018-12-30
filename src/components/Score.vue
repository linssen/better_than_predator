<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 36 36"
  >
    <path
      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
      fill="none"
      stroke="#eee"
      stroke-width="4"
    ></path>
    <path
      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
      fill="none"
      stroke="#CD2E1B"
      stroke-width="4"
      :stroke-dasharray="stroke"
    ></path>
    <text
      x="50%"
      y="50%"
      text-anchor="middle"
      dominant-baseline="middle"
    >{{ percent }}%</text>
  </svg>
</template>

<script>
export default {
  name: 'Score',
  props: {
    voteAvg: { type: Number, default: 0 },
  },
  computed: {
    percent() {
      return Math.round(this.voteAvg * 10);
    },
    stroke() {
      return `${this.percent}, 100`;
    },
  },
};
</script>

<style>
  text {
    font-size: 12px;
    display: none;
  }
</style>
