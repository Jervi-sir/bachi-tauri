<template>
  <div>
    <div class="logo-aniamtion">
      <img src="./assets/images/logo.svg" alt="">
    </div>
  </div>
</template>
<script>
export default {
  created () {
    setTimeout(() => {
      this.$router.push('/home');
    }, 1700);
  },

}
</script>
<style lang="scss" scoped>
.logo-aniamtion {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: rotate-scale-up-diag-1 1.5s linear both;
}

@keyframes rotate-scale-up-diag-1 {
  0% {
    transform: scale(1) rotate3d(1, 1, 0, 0deg) translate(-50%, -50%);
    opacity: 1;
  }
  50% {
    transform: scale(2) rotate3d(1, 1, 0, -180deg) translate(-50%, -50%);
  }
  70% {
    transform: scale(1) rotate3d(1, 1, 0, -360deg) translate(-50%, -50%);
  }
  80% {
    opacity: 0.9;
  }
  90% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
  }
}

</style>
