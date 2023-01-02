<template>
  <div class="about">
    <TodayDate />
    <WorkerRoutes />
    <form class="form" @submit="addWorker">
      <h1>Ajouter un travailleur</h1>
      <input type="text" v-model="name" placeholder="Nom">
      <input type="date" v-model="birthday" placeholder="BirthDay">
      <input type="text" v-model="phone_number" placeholder="Phone Number">
      <input type="text" v-model="location" placeholder="location">
      <input type="text" v-model="position" placeholder="position">
      <button>Ajouter</button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import TodayDate from '../../components/TodayDate.vue';
import { insertWorker } from '../../functions/db';
import WorkerRoutes from './routes.vue';

export default {
  data () {
    return {
      name: '',
      birthday: '',
      phone_number: '',
      location: '',
      position: '',
      added_success: false
    }
  },
  methods: {
    addWorker (e) { 
      e.preventDefault();
      insertWorker(this.name, this.birthday, this.phone_number, this.location, this.position);
      this.added_success = true;
      this.name = '';
      this.location = '';
      this.phone_number = '';
      this.position = '';

      setTimeout(() => {
        this.added_success = false;
        //document.location.reload(true);
      }, 1000);
    },
  },
  name: 'AddWorker',
  components: {
    TodayDate,
    WorkerRoutes
  }
}
</script>

<style lang="scss" scoped>
  .form {
    background: #FFFFFF;
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 2rem 3rem;
    h1 {
      font-weight: 700;
      font-size: 25px;
      color: #000000;
      margin: 0;
    }
    input {
      border: 1px solid #000000;
      border-radius: 7px;
      font-weight: 400;
      font-size: 15px;
      color: #000000;
      padding: 0.5rem 1rem;
    }

    button {
      background: #313638;
      border-radius: 10px 10px 20px 20px;
      border: none;
      font-weight: 600;
      font-size: 15px;
      color: #FFFFFF;
      padding: 1rem 1rem;
    }
  }
</style>
