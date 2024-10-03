<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import AppMain from './components/AppMain.vue';

export default {
    data() {
        return {
            
        };
    },
    components: {
        AppHeader,
        AppFooter,
        AppMain
    }
}
</script>
        

<template>
<div class="container-fluid position-relative p-0">
    <div class="my-welcome">
        <img class="gsap-logo position-absolute " src="../../public/img/logos/boolairbnb-favicon-white.PNG" alt="">
        <img class="gsap-logo-2 position-absolute " src="../../public/img/logos/boolairbnb-bianco-trasparente600px.PNG" alt="">
    </div>

    <AppHeader />

    <AppMain />

    <AppFooter />

</div>
</template>
        

<style lang="scss">
    @use "assets/scss/main" as *;
    @import "assets/scss/partials/reset";
   .my-welcome{
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 4;
  background-color: #EC5A64;
  .gsap-logo{
   
    width: 300px;
    object-fit: contain;
    top: 40%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
   .gsap-logo-2{
   
    width: 300px;
    object-fit: contain;
    top: 70%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
}
</style>

