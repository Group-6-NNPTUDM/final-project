<template>

  <div class="productdetail-page">
    <HeaderVue />
    <div class="body-block mt-5">
      <div class="container">
        <div class="row">
          <div class="col-4">
            <inner-image-zoom :src="product.img" />
          </div>
          <div class="col-8">
            <div class="row">
              <h4 style="text-align: left">
                <strong>{{ product.title }}</strong>
              </h4>
            </div>
            <div class="row product-title">
              <p>
                <button class="btn btn-primary btn-sm" type="button" style="margin-right: 10px">
                  Thích
                  <font-awesome-icon icon="fa-thin fa-thumbs-up" />
                </button>
                <button class="btn btn-primary btn-sm" type="button">
                  Chia sẻ
                </button>
              </p>
            </div>

            <div class="row">
              <div class="col-6 price-block">
                <div class="product_discounted_price">
                  <p><b>Giá bán:</b> {{ product.price }}</p>
                  <p><b>Phí giao hàng:</b> 0đ</p>
                </div>
                <!-- Condition Rendering  -->
                <div v-if="product.isNew" class="product-info">
                  <h5 style="text-align:left"><b>Thông tin khuyến mại và bảo hành</b></h5>
                  <p>New 100%</p>
                  <p>Bảo hành : 12 tháng</p>
                </div>
                <div v-else class="product-info">
                  <h6> <b>Thông tin khuyến mại và bảo hành</b></h6>
                  <p>Hàng 99%</p>
                  <p> <b>Bảo hành:</b> 1 tháng</p>
                </div>
                <div class="product_quantity">
                  <span style="text-align:left"><b>Còn hàng không?:</b>
                    <strong class="text-success" v-if="product.quantity > 0"> Còn hàng</strong>
                    <strong class="text-danger " v-else>Hết hàng</strong>
                  </span>
                </div>
                <div class="row pt-3" style="padding-bottom:20px" >
                  <button @click="addData" type="button" class="btn btn-success">
                    Thêm vào giỏ hàng
                  </button>
                </div>
                <div>
                  <h6><strong>Mô tả đặc tính</strong></h6>
                  <p style="text-align: justify">
                    {{ product.description }}
                  </p>
                </div>


              </div>
              <!-- Banner and Phone Number  -->
              <div class="col-6">
                <div class="row" style="
                    width: 100%;
                    height: auto;
                    border: 1px solid #ccc;
                    margin-left: 2px;
                  ">
                  <div class="phone">
                    <span><b>Hồ Chí Minh:</b></span> 0919 011 011
                    <br />
                  </div>
                  <div class="phone"><span> <b>Hà Nội:</b></span> 0964 600 600</div>
                  <div class="delivery">
                    <ul style="list-style: none;padding-left:60px">
                      <li>Thanh toán thẻ ATM miễn phí</li>
                      <li>
                        Thanh toán thẻ MASTER, VISA <strong>+1.5%</strong>
                      </li>
                      <li><b>Trả Góp:</b> Trả trước 30% +CMND+Hộ khẩu / Bằng lái</li>
                      <li><b>Trả Góp:</b> Dùng thẻ tín dụng lãi suất 0%</li>
                    </ul>
                  </div>
                </div>
                <div class="row" style="margin-top: 10px">
                  <img src="https://mac24h.vn/images/promo/49/68540C4C-BE27-48B2-A3AF-7EAA78738021.jpeg?t=1666949572"
                    alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FooterVue class="mt-5" />
  </div>
</template>

<!-- JS code  -->
<script>
import HeaderVue from "@/components/Header/Header.vue";
import FooterVue from "@/components/Footer/Footer.vue";
import UrlConstant from "../constants/urlConstant";
import "vue-inner-image-zoom/lib/vue-inner-image-zoom.css";
import InnerImageZoom from "vue-inner-image-zoom";
import axios from "axios";


export default {
  data() {
    return {
      productCart: [],
      product: {},
    };
  },
  async mounted() {
    const productId = this.$route.params.id;
    this.product = await getProductInfomation(productId);
    this.product.price = this.product.price.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  },
  components: {
    HeaderVue,
    FooterVue,
    "inner-image-zoom": InnerImageZoom,
  },
  //Lỗi đoạn này 
  methods: {
    addData() {
      const list = JSON.parse(localStorage.getItem("productCart"));
      if (list != null) {
        this.productCart = list;
        const index = this.productCart.findIndex(x => x.id == this.product.id);
        if (index != -1) {

          this.productCart[index].count++;
        } else {
          this.product.count = 1;
          this.productCart.push(this.product);
        }
      } else {
        this.product.count = 1;
        this.productCart.push(this.product);
      }
      localStorage.setItem("productCart", JSON.stringify(this.productCart))
      this.$router.push("/gio-hang/");
    }
  }
};

const getProductInfomation = async (id) => {
  const response = await axios
    .get(`${UrlConstant.URL}products/${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return response;
};
</script>

<style>
.price-block {
  border-top: dashed 1px #ccc;
  margin-top: 10px;
}

</style>

