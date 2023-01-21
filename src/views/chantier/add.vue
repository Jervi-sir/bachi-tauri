<template>
  <div class="body">
    <Header :componentId="routes" title="Chantier"/>
    <form class="form" @submit="addChantier">
      <h1>Ajouter un chantier</h1>
      <div class="row">
        <label for="">Nom</label>
        <input type="text" placeholder="Nom" v-model="name" required>
      </div>
      <div class="row">
        <label for="">Localisation</label>
        <input type="text" placeholder="Entrer l'emplacement du chantier" v-model="location" required>
      </div>
      <button >Ajouter</button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import TodayDate from '../../components/TodayDate.vue';
import { insertChantier } from './_db';
import Routes from './routes.vue';
import Header from '../../components/Header.vue';

export default {
  props: {
  },
  watch: {
  },
  data () {
    return {
      name: '',
      location: '',
      added_success: false,
      routes: Routes
    }
  },
  methods: {
    async addChantier(e) { 
      e.preventDefault();
      await insertChantier(this.name, this.location);
      this.added_success = true;
      this.name = '';
      this.location = '';
      this.emitter.emit('trigger_success_popup', true)

      setTimeout(() => {
        this.added_success = false;
        this.emitter.emit('trigger_success_popup', false)
        document.location.reload(true);
      }, 1000);

    },
  },
  name: 'AddChantier',
  components: {
    TodayDate,
    Routes,
    Header
  }
}
</script>

<style lang="scss" scoped>
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }
  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
  
  .row {
    display: flex;
    flex-direction: column;
    label {
      padding-left: 10px;
      padding-block: 5px;
    }
  }
  .form {
    background: #FFFFFF;
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem 3rem;
    width: 300px;
    margin: auto;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px, rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;
    h1 {
      font-weight: 700;
      font-size: 25px;
      color: #000000;
      margin: 0;
      text-align: center;
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
