<script>
import HeaderVue from "@/components/Header/Header.vue";
import FooterVue from "@/components/Footer/Footer.vue";
import axios from "axios";
import CommonConstant from "@/constants/commonConstant";

export default {
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
    const response = await getProducts(
      this.defaultPage,
      this.limitItems,
      categoryType
    );

    this.type = categoryType;
    this.products = response.products;
    this.totalCount = response.totalCount;
    this.numberOfPaginateBtn = Math.ceil(response.totalCount / this.limitItems);
  },
  methods: {
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
      this.numberOfPaginateBtn = Math.ceil(res.totalCount / this.limitItems);
    },
    async handleFilterByModelYear(object) {
      // find modelyear
      const modelYear = this.dummyModelYear.find((obj) => obj.id === object.id);

      modelYear.checked = !modelYear.checked;

      if (modelYear.checked) {
        this.modelYearsChecked.push(modelYear);
      } else {
        const indexOfModelYear = this.modelYearsChecked.indexOf(
          (year) => year.id === modelYear.id
        );

        this.modelYearsChecked.shift(indexOfModelYear, 1);

        console.log(this.modelYearsChecked, "test");
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
      this.numberOfPaginateBtn = Math.ceil(res.totalCount / this.limitItems);
    },
  },
  components: {
    HeaderVue,
    FooterVue,
  },
};

const getProducts = async (
  page,
  limit = 1,
  type = this.$route.category,
  sortType = CommonConstant.SORT_BY_TITLE,
  orderType = CommonConstant.ORDER_ASC,
  modelYear = []
) => {
  const emptyLength = 0;
  const templateModelYear = `&modelYear=`;
  let totalCountUrl = `http://localhost:8000/api/products?categories=${type}`;
  let productsUrl = `http://localhost:8000/api/products?_page=${page}&_limit=${limit}&_sort=${sortType}&_order=${orderType}&categories=${type}`;

  if (modelYear.length !== emptyLength) {
    modelYear.forEach((year) => {
      const templateModelYearFormatted = templateModelYear + `${year}`;
      totalCountUrl = `${totalCountUrl}${templateModelYearFormatted}`;
      productsUrl = `${productsUrl}${templateModelYearFormatted}`;
    });
  }
  const totalCount = await axios
    .get(totalCountUrl)
    .then((res) => res.data.length)
    .catch((err) => console.log(err));

  const products = await axios
    .get(productsUrl)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return {
    products: products,
    totalCount: totalCount,
  };
};
</script>

<template>
  <div class="product-list-page">
    <HeaderVue />
    <div class="container mt-5">
      <div class="row">
        <div class="col-2">
          <div class="categories-sort">
            <p>Sắp xếp</p>
            <button @click="() => handleSortBtnClick('title', 'asc')">
              Sếp theo tên : A -> Z</button
            ><br />
            <button @click="() => handleSortBtnClick('title', 'desc')">
              Sếp theo tên : Z -> A</button
            ><br />
            <button @click="() => handleSortBtnClick('price', 'asc')">
              Sếp theo giá : Thấp -> Cao</button
            ><br />
            <button @click="() => handleSortBtnClick('price', 'desc')">
              Sếp theo tên : Cao -> Thấp</button
            ><br />
          </div>
          <div class="productsfilter_modalyear mt-5">
            <h6>Model Year</h6>
            <div
              class="form-check"
              v-for="modelYear in dummyModelYear"
              v-bind:key="modelYear.id"
            >
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="modelYear"
                @click="() => handleFilterByModelYear(modelYear)"
              />
              <label class="form-check-label" for="flexCheckDefault">
                {{ modelYear.year }}
              </label>
            </div>
          </div>
        </div>
        <div class="col-10">
          <div class="row category-title">Mac Store</div>
          <div class="row category-description">
            <div v-for="product in products" :key="product.id" class="col-4">
              <img :src="product.img" alt="" />
              <p>{{ product.title }}</p>
              <p>{{ product.price }}</p>
            </div>
          </div>
          <!-- Phân trang  -->
          <nav aria-label="Page navigation example">
            <ul class="pagination" v-if="numberOfPaginateBtn > 1">
              <li
                class="page-item"
                v-for="(btn, index) in numberOfPaginateBtn"
                :key="index"
              >
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
