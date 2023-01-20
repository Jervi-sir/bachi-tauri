<template>
  <div class="body">
    <TodayDate />
    <div class="chantier-list">
      <div class="chantier"  v-for="chantier in chantiers" :key="chantier.id">
        <button @click="selectChantier(chantier.id)" :class="{ 'active': selected == chantier.id }">{{ chantier.name }}</button>
      </div>
    </div>
    <div class="content">
      <div class="left">
        <div class="top">
          <div class="today-amount">
            <label for="">Total d'aujourd'hui</label>
            <input type="text" placeholder="00,000 DA" v-model="chantier_amount" :disabled="!activate_edit_amount">
            <button v-if="!activate_edit_amount" @click="activate_edit_amount = true">edit</button>
            <button v-else @click="updateChantierAmount(chantier_amount, today_chantierDB.id)">save</button>
          </div>
          <div class="search-name">
            <input type="text" placeholder="Nom">
            <button><img src="../../assets/images/search.svg" alt=""></button>
          </div>
        </div>
        <UserTable :workers="workers" :today_chantier_id="today_chantierDB.id"/>
      </div>
      <div class="right">
        <TodayStats :nb_workers="workers.length" :status="today_chantierDB" />
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import TodayDate from '../../components/TodayDate.vue';
import UserTable from './UserTable.vue';
import TodayStats from './TodayStats.vue';
import { createTables, listChantier, getTodayWorkOfChantier, updateChantierAmount } from '../../functions/db';


export default {
  data () {
    return {
      selected_chantier_id: '',
      chantiers: [],  //id, name
      workers: [],  //id, name
      selected: 0,
      activate_edit_amount: false,
      chantier_amount: 0,
      today_chantierDB: [],
    }
  },
  async created () {
    this.chantiers= await listChantier();
  },
  methods: {
     async updateChantierAmount(chantier_amount, today_chantier_id) { 
      this.activate_edit_amount = false;
      let serverResponse = await updateChantierAmount(chantier_amount, today_chantier_id);
      this.chantier_amount = serverResponse.total_invested;
    },
    async selectChantier (id) { 
      this.chantier_amount = 0;
      this.activate_edit_amount = false;
      this.selected = id;
      this.selected_chantier_id = id;

      let serverResponse = await getTodayWorkOfChantier(id);
      this.workers = serverResponse['workers'];
      this.today_chantierDB = serverResponse['chantier'][0];
      this.chantier_amount = this.today_chantierDB.total_invested;
    },
  },
  name: 'HomeView',
  components: {
    TodayDate,
    UserTable,
    TodayStats
  }
}

createTables();

</script>

<style lang="scss" scoped>
.chantier-list {
  display: flex;
  flex-direction: row;
  width: 100%;
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
    .content {
      display: flex;
      justify-content: space-between;
      flex: 1;
      gap: 4rem;
    }
    .left {
      min-width: 70%;
      max-width: 70%;
      width: 70%;
      .top {
        display: flex;
        justify-content: space-between;
        .today-amount {
          display: flex;
          align-items: center;
          background: #D9D9D9;
          border-radius: 10px;
          padding: 5px 10px;
          gap: 1rem;
          label {
            font-weight: 300;
            font-size: 18px;
            color: #545454;
          }
          input {
            font-weight: 500;
            font-size: 22px;
            width: 10rem;
            color: #545454;
            background: transparent;
            border: none;
          }
        }
        .search-name {
          display: flex;
          align-items: center;
          background: #FFFFFF;
          box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.05);
          border-radius: 10px;
          padding: 5px 10px;
          gap: 1rem;
          input {
            font-weight: 400;
            font-size: 16px;
            color: #BABABA;
            background: transparent;
            border: none;
          }
          button {
            background: transparent;
            border: none;
          }
        }
      }
    }
    .right {
      width: 20%;
      text-align: center;
      background: #FFFFFF;
      box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.05);
      border-radius: 40px;
      padding: 2rem 3rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      
    }
  
</style>
