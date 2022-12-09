<template>
    <div>
        <Header />
        <div class="Cart">
            <table class="table">
                <thead>
                    <tr>
                        <td>ID Món Ăn</td>
                        <td>Tên Món Ăn</td>
                        <td>Ảnh</td>
                        <td>Số Lượng</td>
                        <td>Giá</td>
                        <td>Thành Tiền</td>
                    </tr>
                </thead>
                <tbody>
                    <div v-for="product in ProductsCart" :key="product.id" class="col-4">
              <p>
                {{ product.title }}
                
              </p>
              <p>{{ product.price }}</p>
            </div>
                </tbody>
            </table>

        </div>
        <Footer />
    </div>
    </template>
<script>
import Header from "../components/Header/Header.vue";
import Footer from "../components/Footer/Footer.vue";
import { getItemsByCategory } from "@/services/productsService";
export default {
  data() {
    return {
        ProductsCart: JSON.parse(localStorage.getItem("productCart")),
        products: [],
    }

  },
  async mounted(){
    const res = await getItemsByCategory("lenovo");
    this.products= res;
    localStorage.setItem("productCart",JSON.stringify(this.products))
    console.log(this.ProductsCart);
  },
  name: "Cart",
  components: {
    Header,
    Footer,
  },
  watch:{
    store(){
        console.log('message changed')
    }
  },

  methods: {
    setValue() {

    }
}
  }
</script>
