<template>
  <button class="button" @click="viewChantier(chantier_id)">détails</button>
  <div class="bg" v-if="show" @click="show = false"></div>
  <div class="form" v-if="show">
      <span class="exit" @click="show = false">x</span>
      <h1>Détails du Chantier</h1>
      <div class="row">
        <label for="">Nom:</label><span>{{ this.name }}</span> 
      </div>
      <div class="row">
        <label for="">Emplacement:</label><span>{{ this.location }}</span> 
      </div>
      <div class="row">
        <label for="">Nb Ouvriers:</label><span>{{ this.nb_worker }}</span> 
      </div>
      <div class="row">
        <label for="">Total investi:</label><span>{{ this.total_invested }}</span> 
      </div>
      <div class="row">
        <label for="">Total dépensé:</label><span>{{ this.total_spent }}</span> 
      </div>
      
    </div>
</template>

<script>
import { getChantier, getTotalInvestChantier, getNbWorkersChantier } from './_db';

export default {
  methods: {
    async viewChantier(id) {
      const chantierDB = await getChantier(id);
      const money = await getTotalInvestChantier(id);
      const nbWorker = await getNbWorkersChantier(id);
      this.show = true;
      this.name = chantierDB[0].name;
      this.location = chantierDB[0].location;
      this.created_at = chantierDB[0].created_at;
      this.nb_worker = nbWorker || 0;
      this.total_spent = money.total_spent || 0;
      this.total_invested = money.total_invested || 0;

    }
  },
  data () {
    return {
      show: false,
      name: '',
      location: '',
      created_at: '',
      nb_worker: '',
      total_spent: ''
    }
  },
  props: ['chantier_id'],
  name: 'ChantierView',

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
  
}
</style>