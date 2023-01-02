<template>
  <button @click="viewChantier(chantier_id)">stats</button>
  <div class="form" v-if="show">
      <h1>Show {{ this.name }} Chantier</h1>
      <label for="">name:</label><span>{{ this.name }}</span> <br>
      <label for="">location:</label><span>{{ this.location }}</span> <br>
      <label for="">nb_worker:</label><span>{{ this.nb_worker }}</span> <br>
      <label for="">total_spent:</label><span>{{ this.total_spent }}</span> <br>
      <label for="">created_at:</label><span>{{ this.created_at }}</span> <br>
    </div>
</template>

<script>
import { getChantier } from '../../functions/db';

export default {
  methods: {
    async viewChantier(id) {
      const chantierDB = await getChantier(id);
      this.show = true;
      this.name = chantierDB[0].name;
      this.location = chantierDB[0].location;
      this.created_at = chantierDB[0].created_at;
      this.nb_worker = chantierDB[0].name;
      this.total_spent = chantierDB[0].name;
    }
  },
  data () {
    return {
      show: false,
      name: '',
      location: '',
      created_at: '',
      nb_worker: '',
      total_spent: ''
    }
  },
  props: ['chantier_id'],
  name: 'ChantierView',

}

</script>

<style lang="scss" scoped>
.form {
  position: fixed;
  background: white;
}
</style>