<template>
  <header>
    <div class="header">
      <router-link to="/"><img src="./assets/images/home.svg" alt=""></router-link>
      <router-link to="/worker"><img src="./assets/images/user.svg" alt=""></router-link>
      <router-link to="/chantier"><img src="./assets/images/add.svg" alt=""></router-link>
      <router-link to="/stats"><img src="./assets/images/stats.svg" alt=""></router-link>
    </div>
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
  min-height: 99vh;
}

.header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 25px;
  position: sticky;
  top: 0;
  .router-link-active {
    filter: invert(77%) sepia(0%) saturate(3508%) hue-rotate(346deg) brightness(137%) contrast(100%);
  }
}
header {
  min-height: 99vh;
  background: #FFFFFF;
}

.body {
  max-width: 80vw;
  width: 80vw;
}
::-webkit-scrollbar{
  width:2px; 
  height:2px;
  border-left:1px solid #E6ECF8;
}
::-webkit-scrollbar-thumb{
  background-color:#4d4d4d;
}
</style>
