<template>
  <div class="table">
    <table class="compar-table">
      <thead>
        <tr>
          <th data-pos-left="data-pos-left">Nom</th>
          <th>Localisation</th>
          <th>edit</th>
          <th>view</th>
          <th>Travailleurs</th>
        </tr>
      </thead>
      <tbody class="compar-table_zebra">
        <tr class="chantier" v-for="(chantier, index) in chantiers" v-bind:key="index">
          <td>{{ chantier.name }}</td>
          <td>{{ chantier.location }}</td>
          <td>
            <ChantierEdit :chantier_id="chantier.id" />
          </td>
          <td>
            <ChantierView :chantier_id="chantier.id" />
          </td>
          <td>
            ( {{ chantier.nb_workers }} )
            <WorkerView :chantier_id="chantier.id" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ChantierView from './view.vue';
import ChantierEdit from './edit.vue';
import WorkerView from './workersTable.vue';

export default {
  created () {
  },
  methods: {
  },
  name: 'ChantierTable',
  props: ['chantiers'],
  components: {
    ChantierView,
    ChantierEdit,
    WorkerView
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  .chantier:nth-child(odd) {
    background: #f7f6f6;
  }
  .chantier:nth-child(even) {
    background: white;
  }
  td {
    text-align: center;
  }
}
</style>
