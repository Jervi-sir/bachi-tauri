<template>
    <td :class="{ 'disable' : isActivated == false}" >{{ worker.name }}</td>
    <td :class="{ 'disable' : isActivated == false}" v-show="show.phone_number"><span>{{ worker.phone_number }}</span></td>
    <td :class="{ 'disable' : isActivated == false}" v-show="show.location"><span>{{ worker.location }}</span></td>
    <td :class="{ 'disable' : isActivated == false}" v-show="show.position"><span>{{ worker.position }}</span></td>
    <td :class="{ 'disable' : isActivated == false}" data-pos-center="data-pos-center">
      <input 
        :class="{ 'disable' : isActivated == false}"
        :disabled="isActivated == false" 
        type="checkbox" 
        :checked="worker.is_absent != 0" 
        v-model="worker.is_absent" 
        @click="worker.is_absent == 0 ? worker.revenue = 0 : worker.revenue = worker.revenue">
    </td>
    <td :class="{ 'disable' : isActivated == false}">
      <input  
      :disabled="isActivated == false" 
      class="worked-hours" 
      type="number" 
      placeholder="0 H" 
      max="20" min="0" 
      v-model="worker.hour_worked">
    </td>
    <td :class="{ 'disable' : isActivated == false}">
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
      <button v-if="!isActivated" @click="isActivated = true">Edit</button>
      <button class="save" v-else @click="updateWorker()">Save</button>
    </td>
</template>


<script>
import { saveTodayWorkerWork } from './_db';
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
    &.disable {
      background: rgba(53, 23, 1, 0.123);
    }
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
  button {
    background: rgba(0, 0, 0, 0.26);
    color:black;
    border-radius: 10px;
    padding: 5px 10px;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    border: none;
    &.save {
      background: #32de84;
      color:#4B5320;

    }
  }
</style>