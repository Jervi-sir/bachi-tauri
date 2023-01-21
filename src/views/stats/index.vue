<template>
  <div class="body">
    <TodayDate />
    <h2>Statistique des Chantiers</h2>
    <div class="chantier-list">
      <strong>Chantiers: </strong>
      <div class="chantier"  v-for="chantier in chantierList" :key="chantier.id">
        <button @click="selectChantier(chantier.id)" :class="{ 'active': selected == chantier.id }">{{ chantier.name }}</button>
      </div>
    </div>
    <WorkerTable :workers="worker_chantier"/>
    <div v-if="selected != 0" class="chantier_day_select">
      <label for="">Stats par Journée </label>
      <select name="" id="" v-model="selected_day_id">
        <option value="" disabled selected>Selectionnez une Date</option>
        <option :value="day.id" v-for="day in chantier_days" :key="day.id">{{ day.today_date }}</option>
      </select>
      <button class="show-btn" @click="showStatsOfDay(selected_day_id)" :disabled="selected_day_id == 0">Afficher</button>
    </div>
    <ChantierDayTable v-if="selected != 0" :chantier_worker_day="chantier_day_worker_stats" :chantier_day_details="chantier_day_details"/>
    <h2 class="msg-select-chantier" v-if="selected == 0" >Selectionner un chantier</h2>
  </div>
</template>

<script>
import TodayDate from '../../components/TodayDate.vue';
import { listChantier, statsOfChantier, statsOfChantierDay } from './_db';
import WorkerTable from './WorkerTable.vue';
import ChantierDayTable from './ChantierDayTable.vue';

export default {
  data () {
    return {
      chantierList: [],
      chantier: [],
      worker_chantier: [],
      chantier_days: [],
      selected: 0,
      selected_day_id: '',
      chantier_day_worker_stats: [],
      chantier_day_details: [],
    }
  },
  components: {
    TodayDate,
    WorkerTable,
    ChantierDayTable
  },
  async created () {
    this.chantierList= await listChantier();
  },
  methods: {
    async selectChantier(id) { 
      this.selected_day_id= '';
      this.chantier_day_worker_stats= [];
      this.chantier_day_details= [];

      this.selected = id;
      let serverResponse = await statsOfChantier(id);
      this.chantier = serverResponse.chantier;
      this.worker_chantier = serverResponse.worker_chantier;
      this.chantier_days = serverResponse.chantier_days;
      console.log(this.chantier_days)
    },
    async showStatsOfDay(selected_day_id) {
      let serverResponse = await statsOfChantierDay(selected_day_id);
      this.chantier_day_worker_stats = serverResponse['workers_chantier'];
      this.chantier_day_details = serverResponse['chantier_day_details'][0];
      console.log(this.chantier_day_details)
    }
  },
}
</script>

<style lang="scss" scoped>

.chantier_day_select {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  .show-btn {
    background: #000000;
    color: white;
    border-radius: 7px;
    padding: 0.3rem 0.7rem;
    cursor: pointer;
  }
  select {
    border: 1px solid #000000;
    border-radius: 7px;
    font-weight: 400;
    font-size: 15px;
    color: #000000;
    padding: 0.3rem 0.7rem;
    padding-top: 0.2rem;
  }
}

.msg-select-chantier {
  text-align: center;
}

.chantier-list {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  button {
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    text-decoration-line: underline;
    color: #949494;
    background: transparent;
    border: none;
    cursor: pointer;
    &.active {
      color: #000000;
    }
  }
}
</style>