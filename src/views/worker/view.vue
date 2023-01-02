<template>
  <button @click="viewWorker(worker_id)">stats</button>
  <div class="form" v-if="show">
    <h1>Show {{ this.name }} Worker</h1>
    <label for="">name:</label><span>{{ this.name }}</span> <br>
    <label for="">birthday:</label><span>{{ this.birthday }}</span> <br>
    <label for="">phone_number:</label><span>{{ this.phone_number }}</span> <br>
    <label for="">location:</label><span>{{ this.location }}</span> <br>
    <label for="">position:</label><span>{{ this.position }}</span> <br>
    <label for="">created_at:</label><span>{{ this.created_at }}</span> <br>
  </div>
</template>

<script>
import { getWorker } from '../../functions/db';

export default {
  methods: {
    async viewWorker (id) {
      const workerDB = await getWorker(id);
      this.show = true;
      this.name = workerDB[0].name;
      this.birthday = workerDB[0].birthday;
      this.phone_number = workerDB[0].phone_number;
      this.location = workerDB[0].location;
      this.position = workerDB[0].position;
      this.created_at = workerDB[0].created_at;
    }
  },
  data () {
    return {
      show: false,
      name: '',
      birthday: '',
      phone_number: '',
      location: '',
      position: '',
      created_at: ''
      
    }
  },
  props: ['worker_id'],
  name: 'WorkerView',

}

</script>

<style lang="scss" scoped>
.form {
  position: fixed;
  background: white;
}
</style>