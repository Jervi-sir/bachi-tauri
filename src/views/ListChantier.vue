<template>
  <div class="body">
    <TodayDate />
    <ChantierTable :chantiers="allChantiers"/>
  </div>
</template>

<script>
// @ is an alias to /src
import TodayDate from '../components/TodayDate.vue';
import ChantierTable from '../components/ChantierTable.vue';
import { allChantier } from '../functions/db';

export default {
  data () {
    return {
      allChantiers: [],
    }
  },
  async created () {
    this.allChantiers = await allChantier();
  },
  methods: {
  },
  name: 'ListChantier',
  components: {
    TodayDate,
    ChantierTable
  }
}
</script>

<style lang="scss" scoped>
</style>
