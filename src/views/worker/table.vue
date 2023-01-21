<template>
  <div class="table">
    <table class="compar-table">
      <thead>
        <tr>
          <th data-pos-left="data-pos-left">Nom</th>
          <th>Age</th>
          <th>Téléphone</th>
          <th>Localisation</th>
          <th>Poste</th>
          <th>edit</th>
          <th>view</th>
        </tr>
      </thead>
      <tbody class="compar-table_zebra">
        <tr class="worker" v-for="(worker, index) in workers" v-bind:key="index">
          <td>{{ worker.name }}</td>
          <td>{{ showAge(worker.birthday)}} ans, ({{ worker.birthday }})</td>
          <td>{{ worker.phone_number }}</td>
          <td>{{ worker.location }}</td>
          <td>{{ worker.position }}</td>
          <td>
            <WorkerEdit :worker_id="worker.id"/>
          </td>
          <td>
            <WorkerView :worker_id="worker.id"/>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import WorkerView from './view.vue';
import WorkerEdit from './edit.vue';
import { calculateAge } from '../../functions/helpers';

export default {
  name: 'WorkerTable',
  props: ['workers'],
  components: {
    WorkerView,
    WorkerEdit
  },
  methods:{
    showAge(birthday) {
      return calculateAge(birthday)
    }
  }

}
</script>

<style scoped lang="scss">
.compar-table {
  color: black;
  background-color: white;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.42);
  overflow: hidden;
  border-radius: 1rem;
  thead {
    tr {
      background: #F7FCFF;
      color: #7B8188;
      text-align: center;
    }
  }
  .worker:nth-child(odd) {
    background: #f7f6f6;
  }
  .worker:nth-child(even) {
    background: white;
  }
  td {
    text-align: center;
  }
}
</style>
