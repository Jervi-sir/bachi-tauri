<template>
  <button @click="editWorker(worker_id)">edit</button>
  <form class="form" @submit="updateWorker" v-if="show">
    <h1>Edit {{ this.original_name }} Chantier</h1>
    <input type="text" placeholder="Nom" v-model="name" required> <br>
    <input type="text" placeholder="birthday" v-model="birthday" required> <br>
    <input type="text" placeholder="Phone Number" v-model="phone_number" required> <br>
    <input type="text" placeholder="location" v-model="location" required> <br>
    <input type="text" placeholder="position" v-model="position" required> <br>
    <button>Update</button>
  </form>
</template>

<script>
import { getWorker } from '../../functions/db';
import { updateWorker as updateWr } from '../../functions/db';
export default {
  methods: {
    updateWorker () { 
      updateWr(
        this.worker_id,
        this.name,
        this.birthday,
        this.phone_number,
        this.position,
        this.location,
      );
      this.show = false;

    },
    async editWorker (id) { 
      const workerDB = await getWorker(id);
      this.show = true;
      this.worker_id = workerDB[0].id;
      this.original_name = workerDB[0].name;
      this.name = workerDB[0].name;
      this.birthday = workerDB[0].birthday;
      this.phone_number = workerDB[0].phone_number;
      this.location = workerDB[0].location;
      this.position = workerDB[0].position;
    },
  },

  data () {
    return {
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
  },

  name: 'WorkerEdit',
  props: ['worker_id'],

}
</script>


<style lang="scss" scoped>
.form {
  position: fixed;
  background: white;
}
</style>