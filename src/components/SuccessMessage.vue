<template>
    <Transition>
      <div class="added-success" v-if="isActive">
        <img src="../assets/images/success.svg" alt="">
        <h1>added successfully</h1>
      </div>
    </Transition>
</template>

<script>
export default {
  props: ['isActive'],
}

</script>

<style lang="scss" scoped>
  .added-success {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    text-align: center;
    border-radius: 25px;
    padding: 4rem 0.5rem;
    padding-bottom: 3rem;
    h1 {
      font-weight: 700;
      font-size: 25px;
      padding: 0;
      margin: 0;
      margin-top: 1rem;
      color: #000000;
    }
  }
</style>