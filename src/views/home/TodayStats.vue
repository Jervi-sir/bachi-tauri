<template>
  <div class="stats">
    <div class="date">
      <span class="day">Monday,</span>
      01 December 2022
    </div>
    <h1>Statistiques</h1>
    <div class="paied-today">
      <label for="">Payment Aujourd’hui:</label>
      <span>{{ status.total_invested || 0 }}</span>
    </div>
    <div class="paied-total">
      <label for="">total payee:</label>
      <span>{{ status.total_spent || 0 }}</span>
    </div>
    <div class="amount-worker">
      <label for="">travailleurs</label>
      <span>{{ nb_workers || 0 }}</span>
    </div>
    <div class="paied-lefts">
      <label for="">payment restant</label>
      <span>{{ (status.total_invested - status.total_spent) || 0 }}</span>
    </div>
  </div>
</template>

<script>
import emitter from '../../emmiter'
export default {
  created () {
    emitter.on('total_invested', e => this.status.total_invested = e )
    emitter.on('today_spent', e => this.status.total_spent = e )
  },
  name: 'TodayStats',
  props: ['status', 'nb_workers']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.date {
  font-weight: 500;
  font-size: 14px;
  color: #727272;
  .day {
    font-weight: 300;
  }
}
h1 {
  font-weight: 600;
  font-size: 25px;
  color: #000000;
}
.paied-today, 
.paied-total, 
.amount-worker,
.paied-lefts {
  color: black;
  display: flex;
  flex-direction: column;
  label {
    font-weight: 500;
    font-size: 15px;
  }
  span {
    font-weight: 600;
    font-size: 20px;
  }
}
.paied-today {
  color: #3CB073;
}
</style>
