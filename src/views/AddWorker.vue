<template>
  <div class="about">
    <TodayDate />
    <form action="">
      <h1>Ajouter un travailleur</h1>
      <input type="text" placeholder="Nom">
      <input type="date" placeholder="BirthDay">
      <input type="text" placeholder="Phone Number">
      <input type="text" placeholder="location">
      <input type="text" placeholder="position">
      <input type="text" placeholder="chantier">
      <button>Ajouter</button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import TodayDate from '../components/TodayDate.vue';

export default {
  name: 'AddWorker',
  components: {
    TodayDate
  }
}
</script>

<style lang="scss" scoped>
  form {
    background: #FFFFFF;
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 2rem 3rem;
    h1 {
      font-weight: 700;
      font-size: 25px;
      color: #000000;
      margin: 0;
    }
    input {
      border: 1px solid #000000;
      border-radius: 7px;
      font-weight: 400;
      font-size: 15px;
      color: #000000;
      padding: 0.5rem 1rem;
    }

    button {
      background: #313638;
      border-radius: 10px 10px 20px 20px;
      border: none;
      font-weight: 600;
      font-size: 15px;
      color: #FFFFFF;
      padding: 1rem 1rem;
    }
  }
</style>
