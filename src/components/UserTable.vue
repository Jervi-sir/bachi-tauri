<template>
  <div class="table">
    <table class="compar-table">
      <thead>
        <tr>
          <th data-pos-left="data-pos-left">Nom</th>
          <th>Absence</th>
          <th>Paiment</th>
        </tr>
      </thead>
      <tbody class="compar-table_zebra">
        <tr class="user">
          <td>Name 1 Prename 2</td>
          <td data-pos-center="data-pos-center">
            <input type="checkbox">
          </td>
          <td data-pos-center="data-pos-center">
            <input type="text" placeholder="000 Da">
          </td>
        </tr>
        <tr class="user">
          <td>Name 1 Prename 2</td>
          <td data-pos-center="data-pos-center">
            <input type="checkbox">
          </td>
          <td data-pos-center="data-pos-center">
            <input type="text" placeholder="000 Da">
          </td>
        </tr>
        <tr class="user">
          <td>Name 1 Prename 2</td>
          <td data-pos-center="data-pos-center">
            <input type="checkbox">
          </td>
          <td data-pos-center="data-pos-center">
            <input type="text" placeholder="000 Da">
          </td>
        </tr>
        
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'UserTable',
  props: {
    
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
      text-align: left;
    }
  }
  .user:nth-child(odd) {
    background: #f7f6f6;
  }
  .user:nth-child(even) {
    background: white;
  }
}
</style>
