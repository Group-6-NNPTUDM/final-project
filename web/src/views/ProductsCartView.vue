<template>
  <div>
    <Header />
    <div class="container" style="margin-top:50px; margin-bottom: 50px;">
      <div class="Cart">
        <table class="table">
          <thead>
            <tr>
              <th>Tên sản phẩm</th>
              <th>Ảnh</th>
              <th>Số lượng</th>
              <th>Giá</th>
              <th>Thành Tiền</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in ProductsCart" :key="(product.id)">

              <td>{{ product.title }}</td>
              <td><img :src="product.img" width="100" /></td>
              <td><input type="number" @input="updateList(product.id, product.count)" v-model="product.count" /></td>
              <td>{{ product.price }}</td>
              <td>{{ result(product.count, product.price) }}</td>
              <td><a href="#" @click="() => deleteItem(product.id)" class="btn-delete">Xoá</a></td>
            </tr>
          </tbody>
        </table>
        <h4>Tổng tiền: {{ total }}</h4>
        <a id="btnContinue" class="btn btn-outline-primary" @click="redirectPage()">Tiếp tục mua hàng</a>
        <button id="btnDeleteAll" @click="deleteList" class="btn btn-outline-danger cantrai">Xoá giỏ hàng</button>
        <a class="btn btn-outline-primary cantrai" @click="redirectPay()">Thanh toán</a>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import Header from "../components/Header/Header.vue";
import Footer from "../components/Footer/Footer.vue";

export default {
  data() {
    return {
      ProductsCart: [],
      products: [],
      total: 0,
      returnPage: "",
      count:0,
    }

  },
  async mounted() {
    const res = await getList();
    this.ProductsCart = res.ProductsCart;
    this.total = res.total;
    this.returnPage = "/danh-muc-san-pham/" + res.returnPage;
  },
  computed: {
  },
  name: "Cart",
  components: {
    Header,
    Footer,
  },

  methods: {
    result(num1, num2) {
      var res1 = String(num1).replace(/\D/g, "");
      var res2 = String(num2).replace(/\D/g, "");
      var result = Number(res1) * Number(res2);
      return result.toLocaleString("it-IT", { style: "currency", currency: "VND" })
    },
    deleteList() {
      localStorage.removeItem("productCart");
      this.total = 0 + ' VND';
      this.ProductsCart = [];
    },
    updateList(id, number) {
      var res2 = String(number).replace(/\D/g, "");
      number = Number(res2);

      const index = this.ProductsCart.findIndex(x => x.id == id);
      if(number>this.ProductsCart[index].quantity){
        alert("Hàng nhập vào lớn hơn hàng tồn kho")
        number=1;
      }
      this.ProductsCart[index].count = number;
      localStorage.setItem("productCart", JSON.stringify(this.ProductsCart));
      const sum = this.ProductsCart.reduce((acc, item) => acc + (Number(String(item.price).replace(/\D/g, "")) * item.count), 0);
      this.total = sum.toLocaleString("it-IT", { style: "currency", currency: "VND" });
    },
    redirectPage() {
      this.$router.push(this.returnPage);
    },
    redirectPay() {
      this.ProductsCart.forEach((element, index) => {
        if (element.count == 0) {
          this.ProductsCart.splice(index, 1);
        }
      });
      localStorage.setItem("productCart", JSON.stringify(this.ProductsCart));
      this.$router.push('/thanh-toan');
    },
    deleteItem(id) {
      const index = this.ProductsCart.findIndex(x => x.id == id);
      this.ProductsCart.splice(index, 1);
      localStorage.setItem("productCart", JSON.stringify(this.ProductsCart));
      const sum = this.ProductsCart.reduce((acc, item) => acc + (Number(String(item.price).replace(/\D/g, "")) * item.count), 0);
      this.total = sum.toLocaleString("it-IT", { style: "currency", currency: "VND" });
    }
  }
};

const getList = async () => {
  const list = JSON.parse(localStorage.getItem("productCart"))
  const sum = list.reduce((acc, item) => acc + (Number(String(item.price).replace(/\D/g, "")) * item.count), 0);
  const returnPage = localStorage.getItem("categoryClick");
  return {
    ProductsCart: list,
    total: sum.toLocaleString("it-IT", { style: "currency", currency: "VND" }),
    returnPage: returnPage,
  }


};
</script>
<style scoped>
.cantrai {
  margin-left: 20px;
}
</style>