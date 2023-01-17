<template>
  <button @click="getWorkers(chantier_id)">view workers</button>
  <div class="bg" v-if="show" @click="show = false"></div>
  <div class="form" v-if="show">
      <h1>Show <u>{{ this.name }}</u> Workers</h1>
      <div class="stat">
        <div class="tota">
          <label for="">total</label>
          <span>{{ workers.length }}</span>
        </div>
      </div>
      <hr>
      <table class="styled-table">
        <thead>
          <tr>
              <th>Name</th>
              <th>phone_number</th>
              <th>position</th>
              <th>location</th>
              <th>birthday</th>
              <th>remove</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="worker in workers" :key="worker.id">
              <td>{{ worker.name }}</td>
              <td>{{ worker.phone_number }}</td>
              <td>{{ worker.position }}</td>
              <td>{{ worker.location }}</td>
              <td>{{ worker.birthday }}</td>
              <td>
                <button @click="removeFromChantier(worker.id)">remove</button>
              </td>
          </tr>
        </tbody>
    </table>
    <hr>
    <div class="add-worker">
      <span for="">add a worker</span>
      <select name="" id="" v-model="selected_non_worker_id">
        <option disabled default selected>select worker</option>
        <option v-for="not_worker in not_workers" :key="not_worker.id" :value="not_worker.id">
          {{ not_worker.name }} - {{ not_worker.position }} 
        </option>
      </select>
      <button @click="addToChantier()">add to Chantier</button>
    </div>
    </div>
</template>

<script>
import { get_joinedWorkers_and_notJoinedWorkers, addWorkerToChantier, excludeWorkerFromChantier } from '../../functions/db';

export default {
  methods: {
    async getWorkers(id) {
      const serverResponse = await get_joinedWorkers_and_notJoinedWorkers(id);
      this.workers = serverResponse['joined'];
      this.not_workers = serverResponse['notJoined'];
      this.show = true;
      console.log(this.workers);
    },
    async addToChantier() {
      await addWorkerToChantier(this.selected_non_worker_id, this.chantier_id);
      setTimeout(() => {
        this.show = false;
        window.location.reload();
      }, 20);
    },
    async removeFromChantier(id) {
      //this id is not of the worker but of the many to many table rls
      await excludeWorkerFromChantier(id);
      setTimeout(() => {
        this.show = false;
        window.location.reload();
      }, 20);
    }
  },
  data () {
    return {
      show: false,
      workers: [],
      not_workers: [],
      selected_non_worker_id: '',
    }
  },
  props: ['chantier_id'],
  name: 'WorkerView',

}

</script>

<style lang="scss" scoped>
hr {
  display: block;
  height: 1px;
  width: 100%;
}
.bg {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(1px);
}
.form {
  z-index: 99;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px, rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;
  border-radius: 10px;
  background: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  h1 {
    text-align: center;
    padding: 0;
    margin: 0;
  }
  label {
    font-weight: 800;
    margin-right: 7px;
  }
  
}

.styled-table {
    display: block;
    max-height: 20rem;
    overflow-x: scroll;
    thead {
      position: sticky;
      top: 0;
      background: rgb(247, 247, 247);
    }
}
</style>