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
        <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
    {{name}}
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
    <li><button class="dropdown-item" type="button" v-on:click="sortedLowPrice">Sắp theo giá: Thấp -> Cao</button></li>
    <li><button class="dropdown-item" type="button" v-on:click="sortedHighPrice">Sắp theo giá: Cao -> Thấp </button></li>
    <li><button class="dropdown-item" type="button" v-on:click="sortedLowAlphabet">Sắp theo tên: A -> Z</button></li>
    <li><button class="dropdown-item" type="button" v-on:click="sortedHighAlphabet">Sắp theo tên: Z -> A </button></li>
    
  </ul>
</div>
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
      products_item_category:[],
      name: "Sắp xếp theo...",
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
  methods:{
  sortedLowPrice(){
    this.name = "Sắp theo giá: Thấp -> Cao";
    this.products.sort((a, b) => a.price > b.price ? 1: -1 );
},

  sortedHighPrice(){
    this.name = "Sắp theo giá: Cao -> Thấp";
      this.products.sort((a, b) => a.price < b.price ? 1: -1);
  },
  sortedLowAlphabet(){
    this.name = "Sắp theo tên: A -> Z";
      this.products.sort((a, b) => a.title > b.title ? 1: -1);
  },
  sortedHighAlphabet(){
    this.name = "Sắp theo tên: Z -> A";
      this.products.sort((a, b) => a.title < b.title ? 1: -1);
  },
  },
  computed:{
  filteredItems(){
    if (this.$route.params.title == null){
      return this.products;
    }

    if (this.$route.params.title != "All"){
      return this.products.filter(item=>item.categories == this.$route.params.title);
    }
    return this.products;

  },
 
},
}


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
  
