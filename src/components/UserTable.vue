<template>
  <div class="table">
    <div class="shows">
      <div class="option">
        <input type="checkbox" v-model="show.phone_number">
        <span>show Phone Number</span>
      </div>
      <div class="option">
        <input type="checkbox" v-model="show.location">
        <span>show location</span>
      </div>
      <div class="option">
        <input type="checkbox" v-model="show.position">
        <span>show position</span>
      </div>
    </div>
    <table class="compar-table">
      <thead>
        <tr>
          <th data-pos-left="data-pos-left">Nom</th>
          <th>Absence</th>
          <th v-show="show.phone_number">phone number</th>
          <th v-show="show.location">location</th>
          <th v-show="show.position">position</th>
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
          <td v-show="show.phone_number"><span>{{ worker.phone_number }}</span></td>
          <td v-show="show.location"><span>{{ worker.location }}</span></td>
          <td v-show="show.position"><span>{{ worker.position }}</span></td>
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
  data () {
    return {
      show: {
        phone_number: false,
        location: false,
        position: false,
      }
    }
  },
  
  name: 'UserTable',
  props: ['workers', 'chantier_id'],
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.table {
  overflow-y: scroll;
}
.compar-table {
  color: black;
  background-color: white;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.42);
  overflow: hidden;
  border-radius: 1rem;
  overflow-y: scroll;
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
