<template>
  <div class="body">
    <TodayDate />
    
    <div v-for="chantier in chantiers" :key="chantier.id">
      <button @click="selectChantier(chantier.id)">{{ chantier.name }}</button>
    </div>
    <div class="content">
      <div class="left">
        <div class="top">
          <div class="today-amount">
            <label for="">Total d'aujourd'hui</label>
            <input type="text" placeholder="00,000 DA">
          </div>
          <div class="search-name">
            <input type="text" placeholder="Nom">
            <button><img src="../../assets/images/search.svg" alt=""></button>
          </div>
        </div>
        <UserTable :workers="workers" :chantier_id="selected_chantier_id"/>
      </div>
      <div class="right">
        <TodayStats />
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import TodayDate from '../../components/TodayDate.vue';
import UserTable from '../../components/UserTable.vue';
import TodayStats from '../../components/TodayStats.vue';
import { createTables, listChantier, getTodayWorkOfChantier } from '../../functions/db';


export default {
  data () {
    return {
      selected_chantier_id: '',
      chantiers: [],  //id, name
      workers: [],  //id, name
    }
  },
  async created () {
    this.chantiers= await listChantier();
    
  },
  methods: {
    async selectChantier (id) { 
      this.selected_chantier_id = id;
      this.workers = await getTodayWorkOfChantier(id);
      return null 
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
  .body {
    flex: auto;
    .content {
      display: flex;
      justify-content: space-between;
      flex: 1;
      gap: 4rem;
    }
    .left {
      width: 80%;
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
  }
</style>
