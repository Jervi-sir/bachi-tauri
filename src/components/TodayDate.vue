<template>
  <div class="today-date">
    <span class="date">{{date}}</span>
    <span class="time">{{time}}<small>:{{second}}</small></span>
  </div>
  <a href="/about" class="info">
    <img src="../assets/images/info.svg" alt="">
  </a>
</template>

<script>
export default {
  methods: {
    clock() {
      this.time = Intl.DateTimeFormat('fr-FR', {
        hour: 'numeric',
        minute: 'numeric'
      }).format()
      this.date = Intl.DateTimeFormat('fr-FR', {
          day: '2-digit',
          month: 'long'
      }).format()
      this.second = ("0" + Intl.DateTimeFormat('fr-FR', {
          second: 'numeric'
      }).format()).slice(-2);
    }
  },
  
  name: 'TodayDate',
  data() {
    return {
      interval: null,
      time: null,
      date: null,
      second: null
    }
  },
  beforeDestroy() {
    // prevent memory leak
    clearInterval(this.interval)
  },
  created() {
    this.clock();
    // update the time every second
    this.interval = setInterval(() => {
      this.clock();
    }, 1000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.info {
  position: fixed;
  top: 20px;
  right: 20px;
  img {
    width: 25px;
    cursor: pointer;
  }
}
.today-date {
  display: flex;
  align-items: flex-end;
  align-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
  .date {
    font-weight: 700;
    font-size: 30px;
    color: #000000;
    text-transform: capitalize;
  }
  .time {
    font-weight: 300;
    font-size: 25px;
    color: #000000;
    small {
      font-size: 19px;
    }
  }
}
</style>
