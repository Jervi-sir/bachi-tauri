<template>
  <div>
    <TodayDate />
    <h1>{{ title }}</h1>
    <component :is="componentId"></component>
    <SuccessMessage :isActive="added_success"/>
  </div>
</template>

<script>
import SuccessMessage from './SuccessMessage.vue';
import TodayDate from './TodayDate.vue';


export default {
  
  props: ['componentId', 'title'],
  name: 'Header',
  components: {
    TodayDate,
    SuccessMessage
  }
}
</script>