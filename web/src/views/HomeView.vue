<template>
  <div class="Home">
    <Header/>
    <h1>
      This is a home page
    </h1>
  </div>
  <Footer/>
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
