<template>
  <div class="add">
    <Header :componentId="routes" title="Ajouter Ouvrier"/>

    <form class="form" @submit="addWorker">
      <h1>Ajouter un Ouvrier</h1>
      <div class="row">
        <label for="">Nom</label>
        <input type="text" v-model="name" placeholder="Entrez son Nom" required>
      </div>
      <div class="row">
        <label for="">Date Naissance</label>
        <input type="date" v-model="birthday" placeholder="BirthDay" required>
      </div>
      <div class="row">
        <label for="">Téléphone</label>
        <input type="text" v-model="phone_number" placeholder="Phone Number" required>
      </div>
      <div class="row">
        <label for="">Localisation</label>
        <input type="text" v-model="location" placeholder="Où habite le Ouvrier" required>
      </div>
      <div class="row">
        <label for="">Poste</label>
        <select name="" v-model="position" >
          <option value="" disabled selected > Selectionner son Poste</option>
          <option value="masson">masson</option>
          <option value="manourvri">manourvri</option>
          <option value="autre">autre</option>
        </select>
      </div>
      <button :disabled="disable_button">Ajouter</button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import { insertWorker } from './_db';
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
      routes: Routes,
      disable_button: false,
    }
  },
  methods: {
    addWorker (e) { 
      e.preventDefault();
      this.disable_button = true;
      insertWorker(this.name, this.birthday, this.phone_number, this.location, this.position);
      this.added_success = true;
      this.name = '';
      this.location = '';
      this.phone_number = '';
      this.position = '';
      this.emitter.emit('trigger_success_popup', true)

      setTimeout(() => {
        this.added_success = false;
        this.emitter.emit('trigger_success_popup', false)
        window.location.reload(true);
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
    margin-bottom: 5rem;

  }
  .row {
    display: flex;
    flex-direction: column;
    label {
      padding-left: 10px;
      padding-bottom: 5px;
    }
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
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px, rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;
    h1 {
      font-weight: 700;
      font-size: 25px;
      color: #000000;
      margin: 0;
      text-align: center;
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
      cursor: pointer;
    }
  }
</style>
