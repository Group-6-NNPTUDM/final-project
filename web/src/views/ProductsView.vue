<template>
  <div class="product-list-page">
    <HeaderVue />
    <div class="container mt-5">
      <div class="row">
        <div class="col-2">
          
          <div class="categories-menu">
            <h6 class="categories-menu-title">Danh mục sản phẩm</h6>
            <ul class="item-sort">
              <li v-for="category in categories" :key="category.id" @click="() => listProductsByCategory(category.title)">
                <label>{{category.title}}</label>
              </li>
            </ul>
          </div>
          <div class="categories-sort">
            <h6 class="categories-menu-title">Sắp xếp</h6>
            <ul class="item-sort">
              <div class="form-check">
            <li @click="() => handleSortBtnClick('title','asc')">  
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" >
                <label class="form-check-label" for="flexRadioDefault1">
                  Sếp theo tên : A -> Z
               </label>
            </li>
            <li @click="() => handleSortBtnClick('title', 'desc')">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" >
                <label class="form-check-label" for="flexRadioDefault2">
                  Sếp theo tên : Z -> A
               </label>
            </li>
            <li @click="() => handleSortBtnClick('price', 'asc')">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" >
                <label class="form-check-label" for="flexRadioDefault3">
                  Sếp theo giá : Thấp -> Cao
               </label>
            </li>
            <li @click="() => handleSortBtnClick('price', 'desc')">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" >
                <label class="form-check-label" for="flexRadioDefault4">
                  Sếp theo giá : Cao -> Thấp
               </label>
            </li>
          </div>
          </ul>
          </div>
          <div class="categories-sort">
            <h6 class="categories-menu-title">Lọc tìm sản phẩm</h6>
            <h6 class="categories-menu-title">LCD</h6>
            <ul class="item-sort"> 
            <li>
              <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
              <label class="form-check-label" for="flexCheckDefault">
                8.2 inch
              </label>
            </div>
            </li>
            </ul>
            <h6 class="categories-menu-title">Kết nối</h6>
            <ul class="item-sort"> 
            <li>
              <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
              <label class="form-check-label" for="flexCheckDefault">
                WIFI
              </label>
            </div>
            </li>
            </ul>
        </div>
        </div>
        <div class="col-10 bg-primary">
          <div class="row category-title">Mac Store</div>
          <div class="row category-description">
            <p v-for="product in products" :key="product.id">
              {{product.title}} - {{ product.price }}
            </p>
          </div>
          <!-- Phân trang  -->
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item" v-for="(btn, index) in numberOfPaginateBtn" :key="index">
                <button @click="() => handlePaginationBtnClick(index + 1)">{{ btn}}</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    <FooterVue class="mt-5" />
  </div>
</template>


<script>
import "@/assets/css/product/get_24h/products.css";
import HeaderVue from '@/components/Header/Header.vue';
import FooterVue from '@/components/Footer/Footer.vue';
import axios from 'axios';
import CommonConstant from '@/constants/commonConstant';
//import { throwStatement } from "@babel/types";


console.log(CommonConstant);

export default {
    data() {
        return {
            state : [],
            categories:[],
            products: [],
            totalCount: 0,
            limitItems: 4,
            defaultPage: 1,
            numberOfPaginateBtn : 0,
            sortByDefault : CommonConstant.SORT_BY_TITLE,
            orderByDefault : CommonConstant.ORDER_ASC,
        }
    },
    async mounted() {
      const response = await getProducts(this.defaultPage, this.limitItems);
      const responseCategory = await getCategories();
      this.products = response.products;
      this.totalCount = response.totalCount;
      this.numberOfPaginateBtn = Math.ceil(response.totalCount / this.limitItems);
      
      //================== CATEGORY ====================//

      this.categories = responseCategory.categories;
      
      
    },
    methods: {
      async handlePaginationBtnClick(pageIndex) {
        const res = await getProducts(this.state,pageIndex, this.limitItems, this.sortByDefault, this.orderByDefault);
        this.products = res.products
      },
      async handleSortBtnClick(sortType, orderType) {
        const res = await getProducts(this.state,this.defaultPage, this.limitItems, sortType, orderType);
        this.sortByDefault = sortType;
        this.orderByDefault = orderType;
        this.products = res.products;
      },
      async listProductsByCategory(title){
        const res = await getProducts(title,this.defaultPage, this.limitItems, this.sortType, this.orderType);
        this.state = title;
        this.products = res.products;
      }
    },
    components: {
        HeaderVue,
        FooterVue,
    }
}

const getProducts = async (state,page, limit = 1, sortType = CommonConstant.SORT_BY_TITLE, orderType = CommonConstant.ORDER_ASC) => {
  const totalCount = await axios.get('http://localhost:8000/api/products')
    .then((res) => res.data.length)
    .catch((err) => console.log(err))

  const products = await axios.get(`http://localhost:8000/api/products?categories=${state}&_page=${page}&_limit=${limit}&_sort=${sortType}&_order=${orderType}`)
    .then((res) => res.data)
    .catch((err) => console.log(err)) 

  return {
    products : products,
    totalCount : totalCount,
  }
}
//====================== CATEGORY ====================//
const getCategories = async()=>{
  const getCategory = await axios.get('http://localhost:8000/api/categories')
    .then((res)=>res.data)
    .catch((err) => console.log(err)) 

    return{
      categories: getCategory
    }
}


</script>
