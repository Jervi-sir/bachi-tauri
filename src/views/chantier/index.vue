<template>
  <div class="body">
    <Header :componentId="routes" title="Chantiers"/>
    <ChantierTable :chantiers="allChantiers"/>
  </div>
</template>

<script>
// @ is an alias to /src
import ChantierTable from './table.vue';
import { allChantier } from './_db';
import Header from '../../components/Header.vue';
import Routes from './routes.vue';

export default {
  data () {
    return {
      allChantiers: [],
      added_success: false,
      routes: Routes
    }
  },
  async created () {
    this.allChantiers = await allChantier();
  },
  
  name: 'Chantier',
  components: {
    Header,
    ChantierTable,
    Routes
  }
}
</script>

<style lang="scss" scoped>
</style>
