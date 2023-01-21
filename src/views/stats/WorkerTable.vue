<template>
  <div class="table">
    <table class="compar-table">
      <thead>
        <tr>
          <th data-pos-left="data-pos-left">Nom</th>
          <th>Téléphone</th>
          <th>Poste</th>
          <th>Localisation</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody class="compar-table_zebra">
        <tr class="chantier" v-for="(worker, index) in workers" v-bind:key="index">
          <td>{{ worker.name }}</td>
          <td>{{ worker.phone_number }}</td>
          <td>{{ worker.position }}</td>
          <td>{{ worker.location }}</td>
          <td>{{ worker.birthday }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <h5 v-if="workers.length == 0">Aucun travailleur inscrit</h5>
</template>

<script>
export default {
  name: 'WorkerTable',

  props: ['workers']
}
</script>

<style scoped lang="scss">
h5 {
  text-align: center;
}
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