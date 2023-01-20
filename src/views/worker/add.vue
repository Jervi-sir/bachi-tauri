<template>
  <div class="add">
    <Header :componentId="routes" title="Workers"/>

    <form class="form" @submit="addWorker">
      <h1>Ajouter un travailleur</h1>
      <input type="text" v-model="name" placeholder="Nom">
      <input type="date" v-model="birthday" placeholder="BirthDay">
      <input type="text" v-model="phone_number" placeholder="Phone Number">
      <input type="text" v-model="location" placeholder="location">
      <select name="" v-model="position" >
        <option value="" disabled selected > Selectionner sa Position</option>
        <option value="masson">masson</option>
        <option value="manourvri">manourvri</option>
        <option value="autre">autre</option>
      </select>
      <button>Ajouter</button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import { insertWorker } from '../../functions/workerDB';
import Routes from './routes.vue';
import Header from '../../components/Header.vue';

export default {
  data () {
    return {
      name: '',
      birthday: '',
      phone_number: '',
      location: '',
      position: '',
      added_success: false,
      routes: Routes
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
    Routes,
    Header
  }
}
</script>

<style lang="scss" scoped>
  .add {
    flex: 1;
  }
  .form {
    background: #FFFFFF;
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 2rem 3rem;
    margin: auto;
    width: 300px;
    h1 {
      font-weight: 700;
      font-size: 25px;
      color: #000000;
      margin: 0;
    }
    input, select {
      border: 1px solid #000000;
      border-radius: 7px;
      font-weight: 400;
      font-size: 15px;
      color: #000000;
      padding: 0.5rem 1rem;
      padding-top: 0.4rem;
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
