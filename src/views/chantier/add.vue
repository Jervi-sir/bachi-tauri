<template>
  <div class="body">
    <Header :componentId="routes" title="Chantier"/>

    <form class="form" @submit="addChantier">
      <h1>Ajouter un chantier</h1>
      <input type="text" placeholder="Nom" v-model="name" required>
      <input type="text" placeholder="location" v-model="location" required>
      <button >Ajouter</button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import TodayDate from '../../components/TodayDate.vue';
import { insertChantier } from '../../functions/db';
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
    addChantier(e) { 
      e.preventDefault();
      insertChantier(this.name, this.location);
      this.added_success = true;
      this.name = '';
      this.location = '';

      setTimeout(() => {
        this.added_success = false;
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
  
  .form {
    background: #FFFFFF;
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 2rem 3rem;
    width: 300px;
    margin: auto;
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
