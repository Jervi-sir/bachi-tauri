<template>
  <div class="today-date">
    <span class="date">01 December 2022</span>
    <span class="time">15:30</span>
  </div>
</template>

<script>
export default {
  name: 'TodayDate',
  props: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.today-date {
  display: flex;
  gap: 1rem;
  align-items: center;
  .date {
    font-weight: 700;
    font-size: 30px;
    color: #000000;
  }
  .time {
    font-weight: 300;
    font-size: 25px;
    color: #000000;
  }
}
</style>
