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
        <tr class="worker" v-for="(worker, index) in workers" v-bind:key="index">
          <td>{{ worker.name }}</td>
          <td>{{ worker.birthday }}</td>
          <td>{{ worker.phone_number }}</td>
          <td>{{ worker.location }}</td>
          <td>{{ worker.position }}</td>
          <td><button @click="editWorker(index)">edit</button></td>
          <td>
            <WorkerView :worker_id="worker.id"/>
          </td>
        </tr>
      </tbody>
    </table>

    <form class="form" action="" @submit="updateWorker" v-if="modal.show">
      <h1>Edit {{ this.modal.original_name }} Chantier</h1>
      <input type="text" placeholder="Nom" v-model="modal.name" required> <br>
      <input type="text" placeholder="birthday" v-model="modal.birthday" required> <br>
      <input type="text" placeholder="Phone Number" v-model="modal.phone_number" required> <br>
      <input type="text" placeholder="location" v-model="modal.location" required> <br>
      <input type="text" placeholder="position" v-model="modal.position" required> <br>
      <button>Update</button>
    </form>

  </div>
</template>

<script>
import { updateWorker as updateWr } from '../../functions/db';
import WorkerView from './view.vue';

export default {
  methods: {
    updateWorker () { 
      updateWr(
        this.modal.worker_id,
        this.modal.name,
        this.modal.birthday,
        this.modal.phone_number,
        this.modal.position,
        this.modal.location,
      );
      this.modal.show = false;

    },
    editWorker (index) { 
      this.modal.show = true;
      this.modal.worker_id = this.workers[index].id;
      this.modal.original_name = this.workers[index].name;
      this.modal.name = this.workers[index].name;
      this.modal.birthday = this.workers[index].birthday;
      this.modal.phone_number = this.workers[index].phone_number;
      this.modal.location = this.workers[index].location;
      this.modal.position = this.workers[index].position;
    },
    
  },
  data () {
    return {
      modal: {
        show: false,
        worker_id: '',
        original_name: '',
        name: '',
        birthday: '',
        phone_number: '',
        location: '',
        position: '',
        created_at: ''
      }
    }
  },

  
  name: 'WorkerTable',
  props: ['workers'],
  components: {
    WorkerView,
  }

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
  .worker:nth-child(odd) {
    background: #f7f6f6;
  }
  .worker:nth-child(even) {
    background: white;
  }
}
</style>
