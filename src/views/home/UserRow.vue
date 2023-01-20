<template>
    <td>{{ worker.name }}</td>
    <td v-show="show.phone_number"><span>{{ worker.phone_number }}</span></td>
    <td v-show="show.location"><span>{{ worker.location }}</span></td>
    <td v-show="show.position"><span>{{ worker.position }}</span></td>
    <td data-pos-center="data-pos-center">
      <input 
        :disabled="isActivated == false" 
        type="checkbox" 
        :checked="worker.is_absent != 0" 
        v-model="worker.is_absent" 
        @click="worker.is_absent == 0 ? worker.revenue = 0 : worker.revenue = worker.revenue">
    </td>
    <td>
      <input  
      :disabled="isActivated == false" 
      class="worked-hours" 
      type="number" 
      placeholder="0 H" 
      max="20" min="0" 
      v-model="worker.hour_worked">
    </td>
    <td>
      <input 
        :disabled="isActivated == false || worker.is_absent != 0" 
        class="worker-revenue" 
        type="text"
        placeholder="000 DA"  
        @keypress="onlyNumber"
        v-model="worker.revenue"
        >
      </td>
    <td>
      <button v-if="!isActivated" @click="isActivated = true">edit</button>
      <button v-else @click="updateWorker()">save</button>
    </td>
</template>


<script>
import { saveTodayWorkerWork } from '../../functions/db';
import emitter from '../../emmiter';
export default  {
  methods: {
    async updateWorker () { 
      this.isActivated = false;
      let serverResponse = await saveTodayWorkerWork(this.worker.today_worker_id, this.today_chantier_id, this.worker.is_absent, this.worker.revenue, this.worker.hour_worked)
      emitter.emit('today_spent', serverResponse.total_spent);
    },
    onlyNumber ($event) {
      let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
      if ((keyCode < 48 || keyCode > 57)) { // 46 is dot
          $event.preventDefault();
      }
    }
  },
  data () {
    return {
      isActivated: false,
    }
  },
  props: ['worker', 'today_chantier_id', 'show']
}
</script>

<style lang="scss" scoped>
  td {
    text-align: center;
  }
  
  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button {
    opacity: 1;
  }
  .worked-hours {
    width: 5rem;
    border: none;
    border-bottom: 2px solid rgb(202, 202, 202);
    background: transparent;
  }

  .worker-revenue {
    width: 4rem;
    text-align: center;
  }
</style>