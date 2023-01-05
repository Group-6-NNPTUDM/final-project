<template>
  <div class="register-page">
    <Header />
    <Register />
    <Footer />
  </div>
</template>

<script>

import Header from '../components/Header/Header.vue';
import Footer from '../components/Footer/Footer.vue';
import Register from '../components/Register/Register.vue'

export default {
  name: "RegisterPage",
  components: {
    Header,
    Footer,
    Register
  }
}
</script>

<style scoped>

</style>
