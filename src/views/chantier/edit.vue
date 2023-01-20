<template>
  <button class="button" @click="editChantier(chantier_id)">edit</button>
  <div class="bg" v-if="show" @click="show = false"></div>
  <form class="form" action="" @submit="updateChantier" v-if="show">
    <span class="exit" @click="show = false">x</span>
    <h1>Edit <u>{{ this.original_name }}</u> Chantier</h1>
    <div class="row">
      <label for="">Name</label>
      <input type="text" placeholder="Nom" v-model="name" required>
    </div>

    <div class="row">
      <label for="">Location</label>
      <input type="text" placeholder="location" v-model="location" required>
    </div>
    <button>Update</button>
  </form>
</template>

<script>
import { getChantier } from './_db';
import { updateChantier as updateCh } from './_db';
export default {
  methods: {
    updateChantier (e) { 
      e.preventDefault();

      updateCh(this.chantier_id, this.name, this.location);
      setTimeout(() => {
        this.show = false;
        window.location.reload();
      }, 20);

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
.exit {
  position: absolute;
  right: 10px;
  top: 5px;
  font-weight: 800;
  cursor: pointer;
}
.button {
  background: transparent;
  border: none;
  text-decoration: underline;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    color: black;
    opacity: 0.8;
    transition: 0.2s;
  }
}
.bg {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(1px);
}
.form {
  z-index: 99;
  width: 300px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px, rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;
  border-radius: 10px;
  background: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  h1 {
    text-align: center;
    padding: 0;
    margin: 0;
  }
  .row {
    display: flex;
    flex-direction: column;
  }
  input {
    background: #FFFFFF;
    border-radius: 10px;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    padding: 0.7rem 1rem;
  }

  button {
    text-align: center;
    background: #313638;
    border-radius: 10px 10px 20px 20px;
    width: 100%;
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;

    &:hover {
      background: #1d1f20;
      transition: 0.3s;
    }
  }
}
</style>