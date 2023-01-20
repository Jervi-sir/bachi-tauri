<template>
  <button class="button" @click="viewWorker(worker_id)">stats</button>
  <div class="bg" v-if="show" @click="show = false"></div>
  <div class="form" v-if="show">
    <span class="exit" @click="show = false">x</span>
    <h1>Show {{ this.name }} Worker</h1>
    <div class="row">
      <label for="">name:</label><span>{{ this.name }}</span> <br>
    </div>
    <div class="row">
      <label for="">birthday:</label><span>{{ this.birthday }}</span> <br>
    </div>
    <div class="row">
      <label for="">phone_number:</label><span>{{ this.phone_number }}</span> <br>
    </div>
    <div class="row">
      <label for="">location:</label><span>{{ this.location }}</span> <br>
    </div>
    <div class="row">
      <label for="">position:</label><span>{{ this.position }}</span> <br>
    </div>
    <div class="row">
      <label for="">created_at:</label><span>{{ this.created_at }}</span> <br>
    </div>
  </div>
</template>

<script>
import { getWorker } from './_db';

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
  gap: 1rem;
  h1 {
    text-align: center;
    padding: 0;
    margin: 0;
  }
  label {
    font-weight: 800;
    margin-right: 7px;
  }
  input {
    padding-left: 1rem
  }
  
}
</style>