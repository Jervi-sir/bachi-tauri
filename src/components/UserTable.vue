<template>
  <div class="table">
    <table class="compar-table">
      <thead>
        <tr>
          <th data-pos-left="data-pos-left">Nom</th>
          <th>Absence</th>
          <th>phone number</th>
          <th>location</th>
          <th>position</th>
          <th>hours Worked</th>
          <th>Payment</th>
          <th>edit/save</th>
        </tr>
      </thead>
      <tbody class="compar-table_zebra">
        <tr class="user" v-for="worker in workers" :key="worker.id">
          <td>{{ worker.name }}</td>
          <td data-pos-center="data-pos-center">
            <input type="checkbox" :checked="worker.is_absent != 0">
          </td>
          <td><span>{{ worker.phone_number }}</span></td>
          <td><span>{{ worker.location }}</span></td>
          <td><span>{{ worker.position }}</span></td>
          <td><input type="number" placeholder="000 Da" :value="worker.hour_worked"></td>
          <td><input type="text" placeholder="000 Da" :value="worker.revenue"></td>
          <td><button>edit</button></td>
        </tr>     
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'UserTable',
  props: ['workers', 'chantier_id'],
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
