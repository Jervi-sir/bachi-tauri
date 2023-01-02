<template>
  <div class="body">
    <TodayDate />
    <WorkerRoutes />
    <SuccessMessage :isActive="added_success"/>
    <WorkerTable :workers="allWorkers" />
  </div>
</template>

<script>
// @ is an alias to /src
import TodayDate from '../../components/TodayDate.vue';
import SuccessMessage from '../../components/SuccessMessage.vue';
import { allWorkers } from '../../functions/db';
import WorkerTable from './table.vue';
import WorkerRoutes from './routes.vue';

export default {
  data () {
    return {
      allWorkers: [],
      added_success: false,
    }
  },
  async created () {
   this.allWorkers = await allWorkers();
  },
  methods: {
  },
  name: 'Worker',
  components: {
    TodayDate,
    WorkerTable,
    WorkerRoutes,
    SuccessMessage
  }
}
</script>

<style lang="scss" scoped>
</style>
