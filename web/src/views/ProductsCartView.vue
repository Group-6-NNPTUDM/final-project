<template>
    <div>
        <Header />
        <div class="container" style="margin-top:50px; margin-bottom: 50px;">
        <div class="Cart">
            <table class="table" >
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
                  <tr v-for="product in ProductsCart" :key="(product.id, id=1)" >
                        
                        <td>{{product.title}}</td>
                        <td><img :src="product.img" width="100" /></td>
                        <td><input type="number" @input="updateList(product.id,product.count)" v-model="product.count" min="1" max="99"/></td>
                        <td>{{product.price}}</td>
                        <td>{{result(product.count,product.price)}}</td>
                        <td></td>
                      </tr>
                </tbody>
            </table>
            <h4>Tổng tiền: {{total}}</h4>
            <a id="btnContinue" class="btn btn-outline-primary" @click = "redirectPage()">Tiếp tục mua hàng</a>
            <button id="btnDeleteAll" @click="deleteList" class="btn btn-outline-danger cantrai">Xoá giỏ hàng</button>
            <a class="btn btn-outline-primary cantrai" href="/thanh-toan/">Thanh toán</a>
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
        total:0,
        returnPage:"",
    }

  },
  async mounted(){
    const res = await getList();
    this.ProductsCart = res.ProductsCart;
    this.total = res.total;
    this.returnPage = "/danh-muc-san-pham/"+res.returnPage;
  },
  computed:{
  },
  name: "Cart",
  components: {
    Header,
    Footer,
  },

  methods: {
    result(num1,num2){
      var res1 = String(num1).replace(/\D/g, "");
      var res2 = String(num2).replace(/\D/g, "");
      var result = Number(res1)* Number(res2);
      return result.toLocaleString("it-IT", {style: "currency",currency: "VND"})
    },
           deleteList(){
            localStorage.removeItem("productCart");
            localStorage.clear();
            this.ProductsCart=[];
           },
           updateList(id,number){
              var res2 = String(number).replace(/\D/g, "");
              number = Number(res2);
              const index = this.ProductsCart.findIndex(x=>x.id==id);
              this.ProductsCart[index].count = number;
              const sum = this.ProductsCart.reduce((acc,item)=>acc+ (Number(String(item.price).replace(/\D/g, ""))*item.count),0);
              this.total = sum.toLocaleString("it-IT", {style: "currency",currency: "VND"});
              localStorage.setItem("productCart",JSON.stringify(this.ProductsCart));
           },
           redirectPage(){
            this.$router.push(this.returnPage) ;
           }
           
  }
  
};

  const getList= async()=> {
    const list = JSON.parse(localStorage.getItem("productCart"))
    const sum = list.reduce((acc,item)=>acc+ (Number(String(item.price).replace(/\D/g, ""))*item.count),0);
    const returnPage = localStorage.getItem("categoryClick");
    return {
      ProductsCart:list,
      total:sum.toLocaleString("it-IT", {style: "currency",currency: "VND"}),
      returnPage: returnPage,
    }

    
  };
</script>
<style scoped>
  .cantrai{
    margin-left: 20px;
  }
</style>