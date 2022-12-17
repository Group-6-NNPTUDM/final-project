<script>
import Header from "../components/Header/Header.vue";
import Footer from "../components/Footer/Footer.vue";
import axios from "axios";

export default {
  setup() {},
  mounted() {
    const keyword = this.$route.params.keyword;
    this.getProductByKeyword(keyword);
  },
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    getProductByKeyword(keyword) {
      console.log(keyword, "params nè");
    },
  },
  components: {
    Header,
    Footer,
  },
};
</script>

<template>
  <div>
    <Header />
    <div class="container bg-danger mt-5">1</div>
    <Footer />
  </div>
</template>