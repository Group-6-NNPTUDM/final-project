<template>
  <div class="login-page">
    <Header />
    <Login />
    <Footer />
  </div>
</template>

<script>

import Header from '../components/Header/Header.vue';
import Footer from '../components/Footer/Footer.vue';
import Login from '../components/Login/Login.vue'

export default {
    name: "LoginPage",
    components: {
        Header, 
        Footer,
        Login
    }
}
</script>

<style scoped>
</style>
