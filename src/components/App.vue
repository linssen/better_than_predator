<template>
  <div id="app" class="w-full max-w-5xl font-sans">
    <router-view/>
  </div>
</template>

<script>
import '@/assets/tailwind.css';

export default {
  name: 'App',
};
</script>

<style>

  body {
    background-image: url('../assets/lines.png'), url('../assets/bigbg.jpg');
    background-repeat: repeat, no-repeat;
    background-position: 0 0, 50% 50%;
    background-size: auto, cover;
    background-attachment: scroll, fixed;
  }

</style>
