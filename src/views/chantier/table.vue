<template>
  <div class="table">
    <table class="compar-table">
      <thead>
        <tr>
          <th data-pos-left="data-pos-left">Nom</th>
          <th>location</th>
          <th>date</th>
          <th>edit</th>
          <th>view</th>
        </tr>
      </thead>
      <tbody class="compar-table_zebra">
        <tr class="chantier" v-for="(chantier, index) in chantiers" v-bind:key="index">
          <td>{{ chantier.name }}</td>
          <td>{{ chantier.location }}</td>
          <td>{{ chantier.created_at }}</td>
          <td><button @click="editChantier(index)">edit</button></td>
          <td><button @click="viewChantier(chantier.chantier_id)">stats</button></td>
        </tr>
      </tbody>
    </table>

    <form class="form" action="" @submit="updateChantier" v-if="modal.show">
      <h1>Edit {{ this.modal.original_name }} Chantier</h1>
      <input type="text" placeholder="Nom" v-model="modal.name" required>
      <input type="text" placeholder="location" v-model="modal.location" required>
      <button>Update</button>
    </form>

    <div class="form" v-if="stats.show">
      <h1>Show {{ this.stats.name }} Chantier</h1>
      <label for="">name:</label><span>{{ this.stats.name }}</span> <br>
      <label for="">location:</label><span>{{ this.stats.location }}</span> <br>
      <label for="">nb_worker:</label><span>{{ this.stats.nb_worker }}</span> <br>
      <label for="">total_spent:</label><span>{{ this.stats.total_spent }}</span> <br>
      <label for="">created_at:</label><span>{{ this.stats.created_at }}</span> <br>
    </div>

  </div>
</template>

<script>
import { updateChantier as updateCh, getChantier } from '../../functions/db';

export default {
  methods: {
    updateChantier (e) { 
      updateCh(this.modal.chantier_id, this.modal.name, this.modal.location);
      this.modal.show = false;
    },
    editChantier (index) { 
      this.modal.show = true;
      this.modal.chantier_id = this.chantiers[index].chantier_id;
      this.modal.original_name = this.chantiers[index].name;
      this.modal.name = this.chantiers[index].name;
      this.modal.location = this.chantiers[index].location;
    },
    async viewChantier(id) {
      const chantierDB = await getChantier(id);
      this.stats.show = true;
      this.stats.name = chantierDB[0].name;
      this.stats.location = chantierDB[0].location;
      this.stats.created_at = chantierDB[0].created_at;
      this.stats.nb_worker = chantierDB[0].name;
      this.stats.total_spent = chantierDB[0].name;
    }
  },
  data () {
    return {
      modal: {
        show: false,
        chantier_id: '',
        original_name: '',
        name: '',
        location: ''
      },
      stats: {
        show: true,
        name: '',
        location: '',
        created_at: '',
        nb_worker: '',
        total_spent: ''
      }
    }
  },
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
