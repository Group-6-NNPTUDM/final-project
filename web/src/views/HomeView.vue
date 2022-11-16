<template>
  <div class="home-page">
    <Header class="header-block"></Header>
    <div class="body-block">
      Đây là body
    </div>
    <Footer class="footer-block"></Footer>
  </div>
</template>

<script>
import Header from '../components/Header/Header.vue'
import Footer from '../components/Footer/Footer.vue'

export default {
  name: 'Home',
  components: {
    Header,
    Footer
  }
}

</script>

<style>
.body-block {
  height: auto;
}
</style>
