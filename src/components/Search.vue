<template>
  <typeahead/>
</template>

<script>
import { mapActions } from 'vuex';
import Typeahead from '@/components/Typeahead.vue';

export default {
  name: 'Search',
  components: { Typeahead },
  created() {
    this.clearFilms();
  },
  methods: {
    ...mapActions(['clearFilms']),
  },
};
</script>

<style lang="scss">


</style>
