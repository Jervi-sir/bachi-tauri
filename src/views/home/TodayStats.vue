<template>
  <div class="stats">
    <div class="date">
      <span class="day">{{dayText}},</span>
      {{day}} {{ month }}
    </div>
    <h1>Statistiques</h1>
    <div class="invested-today">
      <label for="">Payment Aujourd’hui:</label>
      <span>{{ status.total_invested || 0 }}</span>
    </div>
    <div class="payed-total">
      <label for="">total payee:</label>
      <span>{{ status.total_spent || 0 }}</span>
    </div>
    <div class="amount-worker">
      <label for="">travailleurs</label>
      <span>{{ nb_workers || 0 }}</span>
    </div>
    <div class="payed-lefts">
      <label for="">payment restant</label>
      <span>{{ (status.total_invested - status.total_spent) || 0 }}</span>
    </div>
  </div>
</template>

<script>
import emitter from '../../emmiter'
export default {
  beforeDestroy() {
    // prevent memory leak
    clearInterval(this.interval);
  },
  created () {
    emitter.on('total_invested', e => this.status.total_invested = e )
    emitter.on('today_spent', e => this.status.total_spent = e )
    this.clock();
    // update the time every second
    this.interval = setInterval(() => {
      this.clock();
    }, 1000)
  },
  name: 'TodayStats',
  props: ['status', 'nb_workers'],
  data() {
    return {
      interval: null,
      dayText: null,
      day: null,
      month: null,
      year: null
    }
  },
  methods: {
    clock() {
      this.dayText = Intl.DateTimeFormat('fr-FR', {
        weekday: 'long'
      }).format()
      this.day = Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
      }).format()
      this.month = Intl.DateTimeFormat('fr-FR', {
          month: 'long'
      }).format()
     
     
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.date {
  font-weight: 500;
  font-size: 14px;
  color: #727272;
  text-transform: capitalize;
  .day {
    font-weight: 300;
  }
}
h1 {
  font-weight: 600;
  font-size: 25px;
  color: #000000;
}
.invested-today, 
.payed-total, 
.amount-worker,
.payed-lefts {
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
.invested-today {
  color: #3CB073;
}
.payed-total {
  color: #fd5c63
}
.payed-lefts {
  color: #33006F;
}
</style>
