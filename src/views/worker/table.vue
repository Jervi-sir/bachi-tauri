<template>
  <div class="table">
    <table class="compar-table">
      <thead>
        <tr>
          <th data-pos-left="data-pos-left">Nom</th>
          <th>age</th>
          <th>phone</th>
          <th>location</th>
          <th>position</th>
          <th>edit</th>
          <th>view</th>
        </tr>
      </thead>
      <tbody class="compar-table_zebra">
        <tr class="chantier" v-for="(worker, index) in workers" v-bind:key="index">
          <td>{{ worker.name }}</td>
          <td>{{ worker.birthday }}</td>
          <td>{{ worker.phone_number }}</td>
          <td>{{ worker.location }}</td>
          <td>{{ worker.position }}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>

export default {

  
  name: 'WorkerTable',
  props: ['workers']

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
      text-align: left;
    }
  }
  .chantier:nth-child(odd) {
    background: #f7f6f6;
  }
  .chantier:nth-child(even) {
    background: white;
  }
}
</style>
