<template>
  <div class="body">
    <TodayDate />
    <h1>create chantier</h1>
    <ChantierRoutes />
    <SuccessMessage :isActive="added_success"/>
    <ChantierTable :chantiers="allChantiers"/>
  </div>
</template>

<script>
// @ is an alias to /src
import TodayDate from '../../components/TodayDate.vue';
import ChantierTable from './table.vue';
import ChantierRoutes from './routes.vue';
import SuccessMessage from '../../components/SuccessMessage.vue';
import { allChantier } from '../../functions/db';

export default {
  data () {
    return {
      allChantiers: [],
      added_success: false,
    }
  },
  async created () {
    this.allChantiers = await allChantier();
  },
  methods: {
  },
  name: 'Chantier',
  components: {
    TodayDate,
    ChantierTable,
    ChantierRoutes,
    SuccessMessage
  }
}
</script>

<style lang="scss" scoped>
</style>
