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
          <td>
            <ChantierView :chantier_id="chantier.id" />
          </td>
        </tr>
      </tbody>
    </table>

    <form class="form" action="" @submit="updateChantier" v-if="modal.show">
      <h1>Edit {{ this.modal.original_name }} Chantier</h1>
      <input type="text" placeholder="Nom" v-model="modal.name" required>
      <input type="text" placeholder="location" v-model="modal.location" required>
      <button>Update</button>
    </form>
  </div>
</template>

<script>
import { updateChantier as updateCh } from '../../functions/db';
import ChantierView from './view.vue';

export default {
  methods: {
    updateChantier (e) { 
      e.preventDefault();

      updateCh(this.modal.chantier_id, this.modal.name, this.modal.location);
      this.modal.show = false;
    },
    editChantier (index) { 
      this.modal.show = true;
      this.modal.chantier_id = this.chantiers[index].id;
      this.modal.original_name = this.chantiers[index].name;
      this.modal.name = this.chantiers[index].name;
      this.modal.location = this.chantiers[index].location;
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
      }
    }
  },
  name: 'ChantierTable',
  props: ['chantiers'],
  components: {
    ChantierView,
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
  .chantier:nth-child(odd) {
    background: #f7f6f6;
  }
  .chantier:nth-child(even) {
    background: white;
  }
}
</style>
