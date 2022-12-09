<script>
import HeaderVue from "@/components/Header/Header.vue";
import FooterVue from "@/components/Footer/Footer.vue";
import CommonConstant from "@/constants/commonConstant";
import { getProducts, buildUrlProductById } from "@/services/productsService";
import {
  APPLE_DESC,
  DELL_DESC,
  THINKPAD_DESC,
} from "@/constants/descriptionConstant";

export default {
  created() {
    (this.APPLE_DESC = APPLE_DESC),
      (this.DELL_DESC = DELL_DESC),
      (this.THINKPAD_DESC = THINKPAD_DESC);
  },
  data() {
    return {
      products: [],
      totalCount: 0,
      limitItems: 4,
      defaultPage: 1,
      numberOfPaginateBtn: 0,
      sortByDefault: CommonConstant.SORT_BY_TITLE,
      orderByDefault: CommonConstant.ORDER_ASC,
      modelYearsChecked: [],
      categoryType: null,
      dummyModelYear: [
        {
          id: 0,
          year: 2020,
          checked: false,
        },
        {
          id: 1,
          year: 2021,
          checked: false,
        },
      ],
    };
  },
  async mounted() {
    const categoryType = this.$route.params.category;
    this.categoryType = categoryType;
    const response = await getProducts(
      this.defaultPage,
      this.limitItems,
      categoryType
    );

    this.type = categoryType;
    this.products = response.products;
    this.totalCount = response.totalCount;
    this.updateNumberOfPaginate(response.totalCount, this.limitItems);

    localStorage.setItem("categoryClick",categoryType);
  },
  methods: {
    buildUrlProductById: buildUrlProductById,
    async handlePaginationBtnClick(pageIndex) {
      const res = await getProducts(
        pageIndex,
        this.limitItems,
        this.type,
        this.sortByDefault,
        this.orderByDefault
      );
      this.products = res.products;
    },
    async handleSortBtnClick(sortType, orderType) {
      const res = await getProducts(
        this.defaultPage,
        this.limitItems,
        this.type,
        sortType,
        orderType
      );

      this.sortByDefault = sortType;
      this.orderByDefault = orderType;
      this.products = res.products;
      this.updateNumberOfPaginate(res.totalCount, this.limitItems);
    },
    async handleFilterByModelYear(object) {
      const modelYear = this.dummyModelYear.find((obj) => obj.id === object.id);

      modelYear.checked = !modelYear.checked;

      if (modelYear.checked) {
        this.modelYearsChecked.push(modelYear);
      } else {
        const indexOfModelYear = this.modelYearsChecked.indexOf(
          (year) => year.id === modelYear.id
        );

        this.modelYearsChecked.shift(indexOfModelYear, 1);
      }

      const yearFiltered = this.modelYearsChecked.map((year) => year.year);

      const res = await getProducts(
        this.defaultPage,
        this.limitItems,
        this.type,
        this.sortByDefault,
        this.orderByDefault,
        yearFiltered
      );

      this.products = res.products;
      this.updateNumberOfPaginate(res.totalCount, this.limitItems);
    },
    updateNumberOfPaginate(totalCount, limitItems) {
      this.numberOfPaginateBtn = Math.ceil(totalCount / limitItems)
    }
  },
  components: {
    HeaderVue,
    FooterVue,
  },
};
</script>

<template>
  <div class="product-list-page">
    <HeaderVue />
    <div class="container mt-5">
      <div class="row">
        <div class="col-2">
          <div class="categories-sort">
            <h6 class="fw-bold">Sắp xếp</h6>
            <button class="btn btn-primary btn-sm" @click="() => handleSortBtnClick('title', 'asc')">
              Sếp theo tên : A -> Z</button><br />
            <button class="btn btn-primary btn-sm mt-2" @click="() => handleSortBtnClick('title', 'desc')">
              Sếp theo tên : Z -> A</button><br />
            <button class="btn btn-primary btn-sm mt-2" @click="() => handleSortBtnClick('price', 'asc')">
              Sếp theo giá : Thấp -> Cao</button><br />
            <button class="btn btn-primary btn-sm mt-2" @click="() => handleSortBtnClick('price', 'desc')">
              Sếp theo tên : Cao -> Thấp</button><br />
          </div>
          <div class="productsfilter_modalyear mt-2">
            <h6 class="fw-bold">Model Year</h6>
            <div class="form-check" v-for="modelYear in dummyModelYear" v-bind:key="modelYear.id">
              <input class="form-check-input" type="checkbox" value="" id="modelYear" @click="() => handleFilterByModelYear(modelYear)" />
              <label class="form-check-label fw-bold" for="flexCheckDefault">
                {{ modelYear.year }}
              </label>
            </div>
          </div>
        </div>
        <div class="col-10">
          <h4 class="row category-title fw-bold">Mac Store</h4>
          <div v-show="categoryType === 'apple'">
            <h6 class="text-center fw-bold">{{ APPLE_DESC.title }}</h6>
            <p>{{ APPLE_DESC.desc }}</p>
          </div>
          <div v-show="categoryType === 'lenovo'">
            <h6 class="text-center fw-bold">{{ THINKPAD_DESC.title }}</h6>
            <p>{{ THINKPAD_DESC.desc }}</p>
          </div>
          <div v-show="categoryType === 'dell'">
            <h6 class="text-center fw-bold">{{ DELL_DESC.title }}</h6>
            <p>{{ DELL_DESC.desc }}</p>
          </div>
          <div class="row category-description">
            <div v-for="product in products" :key="product.id" class="col-4">
              <img :src="product.img" alt="" />
              <p>
                {{ product.title }}
                <a v-bind:href="buildUrlProductById(product.id)">see more</a>
              </p>
              <p>{{ product.price }}</p>
            </div>
          </div>
          <!-- Phân trang  -->
          <nav aria-label="Page navigation example">
            <ul class="pagination" v-if="numberOfPaginateBtn > 1">
              <li class="page-item" v-for="(btn, index) in numberOfPaginateBtn" :key="index">
                <button @click="() => handlePaginationBtnClick(index + 1)">
                  {{ btn }}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    <FooterVue class="mt-5" />
  </div>
</template>
