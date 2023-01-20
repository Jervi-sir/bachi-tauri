<template>
  <button class="button" @click="getWorkers(chantier_id)">view workers</button>
  <div class="bg" v-if="show" @click="show = false"></div>
  <div class="form" v-if="show">
      <span class="exit" @click="show = false">x</span>
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
                <button class="delete-btn" @click="removeFromChantierModal(worker.id)">Effacer</button>
              </td>
          </tr>
        </tbody>
    </table>
    <hr>
    <div class="add-worker">
      <span for="">add a worker</span>
      <select name="" id="" v-model="selected_non_worker_id">
        <option value="" disabled selected>select worker</option>
        <option v-for="not_worker in not_workers" :key="not_worker.id" :value="not_worker.id">
          {{ not_worker.name }} - {{ not_worker.position }} 
        </option>
      </select>
      <button @click="addToChantier()" :disabled="disable_add_button || selected_non_worker_id == ''">add to Chantier</button>
    </div>
    </div>
    <div v-show="showRemoveChantierModal" class="remove-confirmation">
      <h5>do u want to remove name from this chantier</h5>
      <div class="options">
        <button class="yes" @click="removeFromChantier(selected_worker_to_remove)">yes</button>
        <button class="no" @click="showRemoveChantierModal = false">no</button>
      </div>
    </div>
</template>

<script>
import { get_joinedWorkers_and_notJoinedWorkers, addWorkerToChantier, excludeWorkerFromChantier } from '../../functions/chantierDB';

export default {
  methods: {
    async getWorkers(id) {
      const serverResponse = await get_joinedWorkers_and_notJoinedWorkers(id);
      this.workers = serverResponse['joined'];
      this.not_workers = serverResponse['notJoined'];
      this.show = true;
    },
    async addToChantier() {
      this.disable_add_button = true;
      await addWorkerToChantier(this.selected_non_worker_id, this.chantier_id);
      this.emitter.emit('trigger_success_popup', true)
      setTimeout(() => {
        this.show = false;
        this.emitter.emit('trigger_success_popup', false)
        window.location.reload();
      }, 1000);
    },
    async removeFromChantier(id) {
      //this id is not of the worker but of the many to many table rls
      this.emitter.emit('trigger_success_popup', true)
      await excludeWorkerFromChantier(id);
      setTimeout(() => {
        //this.show = false;
        this.emitter.emit('trigger_success_popup', false)
        this.showRemoveChantierModal = false;
        window.location.reload();
      }, 1000);
    },
    removeFromChantierModal(rls_id) {
      this.showRemoveChantierModal = true;
      this.selected_worker_to_remove = rls_id;
    }
  },
  data () {
    return {
      show: false,
      showRemoveChantierModal: false,
      workers: [],
      not_workers: [],
      selected_non_worker_id: '',
      selected_worker_to_remove: '',
      disable_add_button: false,
    }
  },
  props: ['chantier_id'],
  name: 'WorkerView',

}

</script>

<style lang="scss" scoped>
.delete-btn {
  background: transparent;
  color:rgb(221, 25, 25);
  text-decoration: underline;
  border: none;
  cursor: pointer;
  &:hover {
    color: rgb(126, 6, 6);
    transition: 0.2s;
  }
}
.remove-confirmation {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 769;
  transform: translate(-50%, -50%);
  background: white;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px, rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(221, 25, 25) 0px 0px 0px 3px;
  border-radius: 15px;
  padding: 1.5rem;
  .options {
    display: flex;
    justify-content: center;
    gap: 2rem;
    button {
      color: black;
      padding: 0.2rem 2rem;
      cursor: pointer;
      border-radius: 7px;
      border: 1px solid rgb(221, 25, 25);
    }
    .yes {
      background: rgb(221, 25, 25);
    }
    .no {
      background: #3affbd;
      border: 1px solid #14ca8e;
    }
  }
}
.button {
  background: transparent;
  border: none;
  text-decoration: underline;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    color: black;
    opacity: 0.8;
    transition: 0.2s;
  }
}

hr {
  display: block;
  height: 1px;
  width: 100%;
}
.exit {
  position: absolute;
  right: 10px;
  top: 5px;
  font-weight: 800;
  cursor: pointer;
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
.add-worker {
  display: flex;
  align-content: stretch;
  align-items: center;
  justify-content: space-between;
  select {
    border: 1px solid #000000;
    border-radius: 7px;
    font-weight: 400;
    font-size: 15px;
    color: #000000;
    padding: 0.5rem 1rem;
    padding-top: 0.4rem;
  }
  button {
    background: black;
    color:white;
    border-radius: 5px;
    padding: 0.5rem 0.7rem;
    cursor: pointer;
    &:disabled {
      opacity: 0.5;
      color: #636363;
    }
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