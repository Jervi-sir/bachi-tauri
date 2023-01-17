<template>
    <TodayDate />
    <h1>create chantier</h1>
    <ChantierRoutes />
    <SuccessMessage :isActive="added_success"/>
</template>

<script>
import ChantierRoutes from './routes.vue';
import SuccessMessage from '../../components/SuccessMessage.vue';
import TodayDate from '../../components/TodayDate.vue';

export default {
  data () {
    return {
      allChantiers: [],
      added_success: false,
    }
  },
  name: 'ChantierHeader',
  components: {
    TodayDate,
    ChantierRoutes,
    SuccessMessage
  }
}
</script>