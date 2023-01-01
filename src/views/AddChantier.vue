<template>
  <div class="about">
    <TodayDate />
    <form class="form" @submit="addChantier">
      <h1>Ajouter un chantier</h1>
      <input type="text" placeholder="Nom" v-model="name">
      <input type="text" placeholder="location" v-model="location">
      <button >Ajouter</button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import TodayDate from '../components/TodayDate.vue';
import { insertChantier } from '../functions/db';

export default {
  data () {
    return {
      name: '',
      location: ''
    }
  },
  methods: {
    addChantier () { 
      e.preventDefault();
      insertChantier(this.name, this.location);
    },
  },
  name: 'AddChantier',
  components: {
    TodayDate
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
