<template>
    <td>{{ worker.name }}</td>
    <td data-pos-center="data-pos-center">
      <input 
        :disabled="isActivated == false" 
        type="checkbox" 
        :checked="worker.is_absent != 0" 
        v-model="worker.is_absent" 
        @click="worker.is_absent == 0 ? worker.revenue = 0 : worker.revenue = worker.revenue">
    </td>
    <td v-show="show.phone_number"><span>{{ worker.phone_number }}</span></td>
    <td v-show="show.location"><span>{{ worker.location }}</span></td>
    <td v-show="show.position"><span>{{ worker.position }}</span></td>
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
        :disabled="isActivated == false" 
        class="worker-revenue" 
        type="text"
        placeholder="000 DA"  
        v-model="worker.revenue"
        >
      </td>
    <td><button @click="activate()">{{ isActivated == false ? 'edit' : 'save' }}</button></td>
</template>

<script>

export default  {
  methods: {
    
    activate () { 
      if(this.isActivated == false) { //so mean will edit
        this.isActivated = true

      } else { //so mean will save
        this.isActivated = false
        this.updateWorker(this.worker.id, this.chantier_id, this.worker.is_absent, this.worker.revenue, this.worker.hour_worked);
      }
    },
    updateWorker (worker_id, chantier_id, is_absent, revenue, hour_worked) { 
      console.log(worker_id, chantier_id, is_absent, revenue, hour_worked)
    },
  },
  data () {
    return {
      show: {
        phone_number: false,
        location: false,
        position: false,
      },
      isActivated: false,
    }
  },
  props: ['worker', 'chantier_id']
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