<script>
import Header from "../components/Header/Header.vue";
import Footer from "../components/Footer/Footer.vue";
import ProductDetail from "../components/ProductDetail/ProductDetail.vue";
import CategoriesType from "../constants/categoriesConstant";
import NavBarVue from "@/components/Navbar/NavBar.vue";
import{ getItemsByCategory} from "@/services/productsService"

export default {
  data() {
    return {
      products: {
        lenovo: [],
        apple: [],
        dell: [],
      },
    };
  },
  async mounted() {
    this.products.lenovo = await getItemsByCategory(CategoriesType.LENOVO);
    this.products.apple = await getItemsByCategory(CategoriesType.MAC);
    this.products.dell = await getItemsByCategory(CategoriesType.DELL);
  },
  name: "Home",
  components: {
    Header,
    Footer,
    ProductDetail,
    NavBarVue
  },
};
</script>

<template>
  <div class="home-page">
    <Header class="header-block"></Header>
    <NavBarVue class="mt-3" />
    <div class="body-block">
      <div class="container mt-5 panel">
        <!-- Main Panel -->
        <div class="row">
          <img src="https://mac24h.vn/images/companies/1/X1%20gen%2010/Mac%20v%C3%A0%20Think%20Chinh%20hang.png?1655968986461" class="main-panel" alt="" />
        </div>
        <!-- Child panel and carousel -->
        <div class="row mt-5">
          <div class="col-7">
            <div class="row">
              <img src="https://mac24h.vn/images/companies/1/Surface/Surface%20Pro%207/m4800/ZBOOK%2015%20G2/CFF9CB2F-89AB-4A23-8453-B1E2C9C59C7E.jpeg?1666599188714" class="thinkpad-img" alt="" />
            </div>
            <div class="row mt-2">
              <img src="https://mac24h.vn/images/companies/1/MacBook%20Pro%20M2/Macbook%20Pro%20M2%20-1.jpg?1658202203162" alt="" />
            </div>
          </div>
          <div class="col-5">
            <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img src="https://mac24h.vn/images/promo/49/68540C4C-BE27-48B2-A3AF-7EAA78738021.jpeg?t=1666949572" class="d-block w-100" alt="t" />
                </div>
                <div class="carousel-item">
                  <img src="https://mac24h.vn/images/promo/49/DELL_XPS.jpg?t=1658478296" class="d-block w-100" alt="t" />
                </div>
                <div class="carousel-item">
                  <img src="https://mac24h.vn/images/promo/49/288366770_1072685073682556_6576069137597330706_n.jpg?t=1655714044" class="d-block w-100" alt="t" />
                </div>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
        <!-- Thinkpad Menu -->
        <div class="row mt-5">
          <div class="col-12">
            <h4 class="badge bg-primary text-wrap">
              Sản phẩm nổi bật : THINKPAD
            </h4>
          </div>
        </div>
        <!-- Render Laptop ThinkPad-->
        <div class="row">
          <div class="col-9">
            <ProductDetail :data="products.lenovo" />
          </div>
          <div class="col-3" style="height: auto">
            <img style="width: 100%; height: 100%" src="https://mac24h.vn/images/companies/1/ThinkPad/T14Giam1tr.JPG?1629468259506" alt="" />
          </div>
        </div>
        <!-- Apple Menu -->
        <div class="row mt-5">
          <div class="col-12">
            <h4 class="badge bg-primary text-wrap">Sản phẩm nổi bật : APPLE</h4>
          </div>
        </div>
        <!-- Render Apple Items -->
        <div class="row">
          <div class="col-9">
            <ProductDetail :data="products.apple" />
          </div>
          <div class="col-3" style="height: auto">
            <img style="width: 100%; height: 100%" src="https://mac24h.vn/images/companies/1/Banner/banner%20nho%CC%89/tong%20dai%2022.jpg?1636369232783" alt="" />
          </div>
        </div>
        <!-- Dell Menu -->
        <div class="row mt-5">
          <div class="col-12">
            <h4 class="badge bg-primary text-wrap">Sản phẩm nổi bật : DELL</h4>
          </div>
        </div>
        <!-- Render Dell Items -->
        <div class="row">
          <div class="col-9">
            <ProductDetail :data="products.dell" />
          </div>
          <div class="col-3" style="height: auto">
            <img style="width: 100%; height: 100%" src="https://mac24h.vn/images/companies/1/LAPTOP/Alienware%20M17%202019/X1%20extreme/DELL%207373/Macbook%2012/Surface%20X/t480/T490/x1%20carbon/TRA%CC%89%20GOP%2020%25.jpg?1575991878361" alt="" />
          </div>
        </div>
      </div>
    </div>
    <Footer class="footer-block mt-5"></Footer>
  </div>
</template>

<style>
.body-block {
  height: auto;
}

.main-panel {
  width: 100%;
  height: auto;
}
</style>
