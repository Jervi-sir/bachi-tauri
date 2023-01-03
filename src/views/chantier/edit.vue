<template>
  <button @click="editChantier(chantier_id)">edit</button>
  <form class="form" action="" @submit="updateChantier" v-if="show">
    <h1>Edit {{ this.original_name }} Chantier</h1>
    <input type="text" placeholder="Nom" v-model="name" required>
    <input type="text" placeholder="location" v-model="location" required>
    <button>Update</button>
  </form>
</template>

<script>
import { getChantier } from '../../functions/db';
import { updateChantier as updateCh } from '../../functions/db';
export default {
  methods: {
    updateChantier (e) { 
      e.preventDefault();

      updateCh(this.chantier_id, this.name, this.location);
      this.show = false;
    },
    async editChantier(id) { 
      const chantierDB = await getChantier(id);
      console.log(chantierDB[0])
      this.show = true;
      this.chantier_id = chantierDB[0].id;
      this.original_name = chantierDB[0].name;
      this.name = chantierDB[0].name;
      this.location = chantierDB[0].location;
    }
  },

  data () {
    return {
      show: false,
      chantier_id: '',
      original_name: '',
      name: '',
      location: ''
    }
  },

  name: 'ChantierEdit',
  props: ['chantier_id'],

}
</script>


<style lang="scss" scoped>
.form {
  position: fixed;
  background: white;
}
</style>