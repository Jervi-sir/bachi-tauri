<template>
  <div class="table">
    <table class="compar-table">
      <thead>
        <tr>
          <th data-pos-left="data-pos-left">Nom</th>
          <th>Absence</th>
        </tr>
      </thead>
      <tbody class="compar-table_zebra">
        <tr class="chantier" v-for="chantier in chantiers" v-bind:key="chantier.chantier_id">
          <td>{{ chantier.name }}</td>
          <td>{{ chantier.location }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ChantierTable',
  props: ['chantiers']
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
