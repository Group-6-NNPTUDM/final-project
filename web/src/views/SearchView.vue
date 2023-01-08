<script>
import Header from "../components/Header/Header.vue";
import Footer from "../components/Footer/Footer.vue";
import axios from "axios";
import {buildUrlProductById} from '../services/productsService';

export default {
  setup() {},
  async mounted() {
    const keyword = this.$route.params.keyword;

    console.log(keyword);
    this.products = await this.getProductByKeyword(keyword);

    console.log(this.products);
  },
  data() {
    return {
      keyword: "",
      products : []
    };
  },
  methods: {
    async getProductByKeyword(keyword) {
      const url = buildSearchUrl(keyword);

      const response = await axios.get(url)
        .then((response) => response.data)
        .catch((err) => console.log(err));

      console.log(response.length, 'response')
      return response;
    },
    buildUrlProductById : buildUrlProductById
  },
  components: {
    Header,
    Footer,
  },
};

function buildSearchUrl(keyword) {
  const url = keyword === undefined ? "http://localhost:8000/api/products" : `http://localhost:8000/api/products?q=${keyword}`;

  return url;
}
</script>

<template>
  <div>
    <Header />
    <div class="container mt-5">
      Search Result
      <div class="row">
        <div class="col-3 mt-2" v-for="product in products" :key="product.id">
          <div class="card" style="width: 18rem;">
            <img :src="product.img" class="card-img-top" alt="#">
            <div class="card-body">
              <h5 class="card-title">{{product.title}}</h5>
              <h5 class="text-danger"><strong>{{ product.price.toLocaleString("it-IT", { style: "currency", currency: "VND" }) }}</strong></h5>
              <h5 ><a v-bind:href="buildUrlProductById(product.id)">See more</a></h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer class="mt-5" />
  </div>
</template>