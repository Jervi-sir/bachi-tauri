<template>
  <div class="option-list">
    <router-link to="/chantier">Afficher Tous</router-link> | 
    <router-link to="/chantier/add">Ajouter un Chantier</router-link>
  </div>
</template>

<script>
export default {
  name: 'ChRoutes',
}
</script>

<style lang="scss" scoped>
.option-list {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  gap: 1rem;
  a {
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    text-decoration-line: underline;
    color: #949494;
    background: transparent;
    border: none;
    cursor: pointer;
    &.router-link-active {
      color: #000000;
    }
  }
}
</style>