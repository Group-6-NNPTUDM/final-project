<template>
  <div class="product-page">
    <Header />
    <div class="row" style="margin: unset; padding-top: 40px">
      <div class="col-sm-4">
        <div class="can-giua" style="padding-top: 20px">
          <ul class="mb-0 nav nav-food can-giua bo-goc my-list-menu">
            <ProductCategory />
          </ul>
        </div>
      </div>

      <hr class="d-sm-none" />
      <div class="col-sm-8">
        <div class="card-group">
            <div class="my-flex" style="padding-top:20px" v-for="item in filteredItems" v-bind:key="item.index">
          <div class="card" >
            
            <img
              class="card-img-top"
              v-bind:src="item.img"
              alt="Card image cap"
            />
            <div class="card-body">
              <h6 class="card-title">{{ item.title }}</h6>
              <p class="card-text">
                <small class="text-muted">{{ item.price }}</small>
              </p>

            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
  
  <script>
import axios from "axios";
import "@/assets/css/product/style.css";
import Header from "../components/Header/Header.vue";
import Footer from "../components/Footer/Footer.vue";
import ProductCategory from "../components/ProductDetail/ProductCategory.vue";




export default {
  data() {
    return {
      products: [],
    };
  },
  async mounted() {
    const result = await getLaptop();
    this.products = result;
  },

  name: "ProductPage",
  components: {
    Header,
    Footer,
    
    ProductCategory,
  },

  computed:{
  filteredItems(){
    if (this.$route.params.title != null){
      return this.products.filter(item=>item.categories == this.$route.params.title);
    }else{
      return this.products;
    }
   
  }
}
};
const getLaptop = async () => {
  const url = "http://localhost:8000/api/products";
  let products = [];
  try {
    await axios
      .get(url)
      .then((res) => (products = res.data))
      .catch((err) => console.log(err));

    return products;
  } catch (error) {
    console.log(error);
  }
};

</script>
  
