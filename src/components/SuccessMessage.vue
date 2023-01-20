<template>
    <Transition>
      <div class="added-success" v-show="trigger_success_popup">
        <img src="../assets/images/success.svg" alt="">
        <h1>Added <br> successfully</h1>
      </div>
    </Transition>
</template>

<script>
export default {
  data () {
    return {
      trigger_success_popup: false
    }
  },
  created() {
    this.emitter.on('trigger_success_popup', e => this.trigger_success_popup = e )
  },
  
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
    padding: 3rem 4rem;
    padding-bottom: 3rem;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px, rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;
    z-index: 999;

    h1 {
      font-weight: 700;
      font-size: 25px;
      padding: 0;
      margin: 0;
      margin-top: 1rem;
      color: #000000;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transition: 1s;
  }
</style>