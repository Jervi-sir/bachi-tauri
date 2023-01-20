<template>
    <div class="shows">
      <div class="option">
        <input id="phoneNumber" type="checkbox" v-model="show.phone_number">
        <label for="phoneNumber">show Phone Number</label>
      </div>
      <div class="option">
        <input id="location" type="checkbox" v-model="show.location">
        <label for="location">show location</label>
      </div>
      <div class="option">
        <input id="position" type="checkbox" v-model="show.position">
        <label for="position">show position</label>
      </div>
    </div>
  <div class="table">
    <table class="compar-table">
      <thead>
        <tr>
          <th data-pos-left="data-pos-left">Nom</th>
          <th v-show="show.phone_number">phone number</th>
          <th v-show="show.location">location</th>
          <th v-show="show.position">position</th>
          <th>Absence</th>
          <th>hours Worked</th>
          <th>Payment</th>
          <th>edit/save</th>
        </tr>
      </thead>
      <tbody class="compar-table_zebra">
        <tr class="user freezen" v-for="worker in workers" :key="worker.id" >
          <UserRow :worker="worker" :today_chantier_id="today_chantier_id" :show="show"/>
        </tr>     
      </tbody>
    </table>
  </div>
</template>

<script>
import UserRow from './UserRow.vue';
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
  props: ['workers', 'today_chantier_id'],
  components: {
    UserRow,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


.shows {
  display: flex;
  gap: 1rem;
  .option {
    display: flex;
    flex-direction: row;
    align-items: center;
    label {
      font-weight: 600;
      font-size: 12px;
    }
  }
}

.table {
  overflow-y: scroll;
}
.compar-table {
  padding: 4px;
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
  th {
    text-align: center;
  }
  
  .user:nth-child(odd) {
    background: #f7f6f6;
  }
  .user:nth-child(even) {
    background: white;
  }
}
</style>
