<template>
  <div class="body">
    <Header :componentId="routes" title="Workers"/>
    <SuccessMessage :isActive="added_success"/>
    <WorkerTable :workers="allWorkers" />
  </div>
</template>

<script>
// @ is an alias to /src
import { allWorkers } from '../../functions/db';
import WorkerTable from './table.vue';
import Routes from './routes.vue';
import Header from '../../components/Header.vue';

export default {
  data () {
    return {
      allWorkers: [],
      added_success: false,
      routes: Routes
    }
  },
  async created () {
   this.allWorkers = await allWorkers();
  },
  methods: {
  },
  name: 'Worker',
  components: {
    Header,
    WorkerTable,
    Routes,
  }
}
</script>

<style lang="scss" scoped>
</style>
