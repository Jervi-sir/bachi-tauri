<template>
  <button @click="editWorker(worker_id)">edit</button>
  <div class="bg" v-if="show" @click="show = false"></div>
  <form class="form" @submit="updateWorker" v-if="show">
    <h1>Edit <u>{{ this.original_name }}</u> Worker</h1>
    <div class="row">
      <label for="">Name</label>
      <input type="text" placeholder="Nom" v-model="name" required>
    </div>
    <div class="row">
      <label for="">birthday</label>
      <input type="text" placeholder="birthday" v-model="birthday" required>
    </div>
    <div class="row">
      <label for="">Phone Number</label>
      <input type="text" placeholder="Phone Number" v-model="phone_number" required>
    </div>
    <div class="row">
      <label for="">Location</label>
      <input type="text" placeholder="location" v-model="location" required>
    </div>
    <div class="row">
      <label for="">Position</label>
      <input type="text" placeholder="position" v-model="position" required>
    </div>

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
      setTimeout(() => {
        this.show = false;
        window.location.reload();
      }, 20);

    },
    async editWorker (id) { 
      const workerDB = await getWorker(id);
      console.log(workerDB)
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
  width: 300px;
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
  gap: 7px;
  h1 {
    text-align: center;
    padding: 0;
    margin: 0;
  }
  .row {
    display: flex;
    flex-direction: column;
  }
  input {
    background: #FFFFFF;
    border-radius: 10px;
    padding: 7px;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  }

  button {
    text-align: center;
    background: #313638;
    border-radius: 10px 10px 20px 20px;
    width: 100%;
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;

    &:hover {
      background: #1d1f20;
      transition: 0.3s;
    }
  }
}
</style>