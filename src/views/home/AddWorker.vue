<template>
  <button class="button" @click="addWorkerToChantierModal()">Ajouter un Travailleur</button>
  <div class="bg" v-if="show" @click="show = false"></div>
  <div class="form" @submit="updateWorker" v-if="show">
    <span class="exit" @click="show = false">x</span>
    <h1>add worker</h1>
    <div class="row">
      <label for="">workers</label>
      <select name="" v-model="selected_worker" >
        <option value="" disabled selected > Selectionner sa Position</option>
        <option :value="worker.id" v-for="(worker, index) in workers_notJoined" :key="index">
          {{worker.name}} - {{ worker.position }} 
        </option>
      </select>
    </div>
    <button @click="addWorkerToChantier()" :disabled="selected_worker == ''">Update</button>
  </div>
</template>

<script>
import { getWorkersNotInChantier, addWorkerToChantierFromTodayChantier } from './_db';
export default {
  methods: {
    async addWorkerToChantierModal() {
      this.show = true;
      let chantier_id = this.today_chantier.chantier_id;
      this.workers_notJoined = await getWorkersNotInChantier(chantier_id);
    },  
    async addWorkerToChantier() { 
      await addWorkerToChantierFromTodayChantier(this.selected_worker, this.today_chantier);
      window.location.reload();
    },
  },
  data () {
    return {
      show: false,
      selectd_workeer: '',
      workers_notJoined: [],
    }
  },
  props: ['today_chantier'],
  
}
</script>

<style lang="scss" scoped>
button {
  background: black;
  color: white;
  border-radius: 7px;
  padding: 0.5rem 1rem;
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
.exit {
  position: absolute;
  right: 10px;
  top: 5px;
  font-weight: 800;
  cursor: pointer;
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
  input, select {
    background: #FFFFFF;
    border-radius: 7px;
    padding: 7px;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    padding: 8px;
    padding-left: 12px;
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