<template>
  <header>
    <router-link to="/"><img src="./assets/images/home.svg" alt=""></router-link>
    <router-link to="/all_users"><img src="./assets/images/user.svg" alt=""></router-link>
    <router-link to="/add_worker"><img src="./assets/images/add.svg" alt=""></router-link>
    <router-link to="/add_chantier"><img src="./assets/images/add.svg" alt=""></router-link>
    <router-link to="/stats"><img src="./assets/images/stats.svg" alt=""></router-link>
  </header>
  <router-view/>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');

body {
  margin: 0;
}

#app {
  display: flex;
  background: #F9F9FB;
  gap: 2rem;
  font-family: 'Inter', sans-serif !important;
}

header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 25px;
  background: #FFFFFF;

  .router-link-active {
    filter: invert(77%) sepia(0%) saturate(3508%) hue-rotate(346deg) brightness(137%) contrast(100%);
  }
}

</style>
