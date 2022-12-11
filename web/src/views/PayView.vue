<template>
    <div>
        <Header />
       
<div class="row" style="margin:auto">
    <div class="my-swapper col-sm-8" style="margin-left:100px">
            <div class="form-horizontal">

                <h4>Thanh toán</h4>
                <hr />
                
                <div class="form-group">
                    <div class="row">
                        <div class="my-a-infor">Tên người nhận: </div>
                        <input type="text"/>
                    </div>
                </div>

                <div class="form-group">

                    <div class="row">
                        <div class="my-a-infor">Số điện thoại: </div>
                        <input type="text"/>
                    </div>
                </div>

                <div class="form-group">

                    <div class="row">
                        <div class="my-a-infor">Địa chỉ: </div>
                        <input type="text"/>
                    </div>
                </div>

                <div class="form-group">

                    <div class="row">
                        <div class="my-a-infor">Email: </div>
                        <input type="text"/>
                    </div>
                </div>

                <div class="form-group">
                    <div class="row">
                        <input style="margin-left:20px" type="submit" value="Thanh toán" class="btn btn-outline-success" />
                        <a class="btn btn-outline-danger" style="margin-left:20px" href="/gio-hang/">Quay lại</a>
                    </div>
                </div>
            </div>
    </div>
    <div class="my-swapper col-sm-4">
        <h3>HOÁ ĐƠN</h3>
        <table>
            <tr>
                <th>Tên sản phẩm</th>
                <th>Số lượng</th>
                <th>Tổng tiền</th>
            </tr>
            

                <tr v-for="product in ProductsCart" :key="(product.id)">
                    <td>{{product.title}}</td>
                    <td>{{product.count}}</td>
                    <td>{{result(product.count,product.price)}}</td>
                </tr>


        </table>
        <div style="margin-top: 15px"><b class="text-danger">Tổng tiền thanh toán: {{total}}</b></div>
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
        total:0,
    }

  },
  async mounted(){
    const res = await getList();
    this.ProductsCart = res.ProductsCart;
    this.total = res.total;
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
<style>
            table {
                font-family: arial, sans-serif;
                border-collapse: collapse;
                width: 100%;
            }

            td, th {
                border: 1px solid black;
                text-align: left;
                padding: 8px;
            }

            tr:nth-child(even) {
                background-color: #dddddd;
            }
            .my-swapper {
    max-width: 600px;
    min-height: 30px;
    border: 1px solid gray;
    padding: 15px;
    border-radius: 10px;
    margin: auto;
    margin-top: 10%;
    margin-bottom: 10%;
}
.boderText {
    width: 300px;
}
.my-a-infor {
    font-family:Helvetica;
    padding-top: 10px;
    margin-right: 30px;
    margin-left: 30px;
    width:150px;

}
.my-a-btn {
    text-decoration: none !important;
    color: white;
}
    .my-a-btn:hover {
        text-decoration: none !important;
        color: white;
    }
.my-margin-left{
    margin-left:30px;
}


</style>