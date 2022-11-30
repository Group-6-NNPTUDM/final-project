<template>
    <div class="product-list-page">
        <HeaderVue />
        <div class="container mt-5">
            <div class="row">
                <div class="col-2 bg-warning">
                    Khối filter, sort,...
                    <div class="categories-menu">
                        <h6 class="categories-menu-title">Danh mục sản phẩm</h6>
                        <ul>
                            <li>Apple</li>
                            <li>Lenovo</li>
                            <li>Dell</li>
                        </ul>
                    </div>
                    <div class="categories-sort">
                        <h6>Sắp xếp</h6>
                        <button @click="() => handleSortBtnClick('title', 'asc')">Sếp theo tên : A -> Z</button><br>
                        <button @click="() => handleSortBtnClick('title', 'desc')">Sếp theo tên : Z -> A</button><br>
                        <button>Sếp theo giá : Thấp -> Cao</button><br>
                        <button>Sếp theo tên : Cao -> Thấp</button><br>
                    </div>
                </div>


                <!-- Products -->
                <div class="col-10 bg-primary">
                    <div class="row category-title">Mac Store</div>

                    <div class="row">
                        <div class="col-md-4 col-sm-6 col-xs-">
                            <!-- 1 product -->


                            <!-- test col (xóa test bật cái dưới lên sài lại)-->
                            <v-container class="grey lighten-5">
                                <v-row no-gutters>
                                    <v-col order="last">
                                        <v-card class="col-md-6" outlined tile>
                                            <div class="my-flex" style="padding-top:10px" v-for="product in products"
                                                :key="product.id">
                                                <div class="card">
                                                    <img class="card-img-top" :src="product.img" alt="Card image cap" />
                                                    <div class="card-body">
                                                        <h6 class="card-title">{{ product.title }}</h6>
                                                        <p class="card-text">
                                                            <small class="text-muted">{{
                                                                    product.price.toLocaleString('it-IT', {
                                                                        style: 'currency',
                                                                        currency: 'VND'
                                                                    })
                                                            }}</small>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <!-- end test -->



                            <!-- <div class="card-group">
                                <div class="my-flex" style="padding-top:10px" v-for="product in products"
                                    :key="product.id">
                                    <div class="card">
                                        <img class="card-img-top" :src="product.img" alt="Card image cap" />
                                        <div class="card-body">
                                            <h6 class="card-title">{{ product.title }}</h6>
                                            <p class="card-text">
                                                <small class="text-muted">{{ product.price.toLocaleString('it-IT', {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                    })
                                                }}</small>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div> -->
                        </div>
                    </div>



                    <!-- Phân trang  -->
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item" v-for="(btn, index) in numberOfPaginateBtn" :key="index">
                                <button @click="() => handlePaginationBtnClick(index + 1)">{{ btn }}</button>
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

import HeaderVue from '@/components/Header/Header.vue';
import FooterVue from '@/components/Footer/Footer.vue';
import axios from 'axios';
import CommonConstant from '@/constants/commonConstant';

console.log(CommonConstant);

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
        }
    },
    async mounted() {
        const response = await getProducts(this.defaultPage, this.limitItems);

        this.products = response.products;
        this.totalCount = response.totalCount;
        this.numberOfPaginateBtn = Math.ceil(response.totalCount / this.limitItems);
    },
    methods: {
        async handlePaginationBtnClick(pageIndex) {
            const res = await getProducts(pageIndex, this.limitItems, this.sortByDefault, this.orderByDefault);
            this.products = res.products
        },
        async handleSortBtnClick(sortType, orderType) {
            const res = await getProducts(this.defaultPage, this.limitItems, sortType, orderType);
            this.sortByDefault = sortType;
            this.orderByDefault = orderType;
            this.products = res.products;
        }
    },
    components: {
        HeaderVue,
        FooterVue,
    }
}

const getProducts = async (page, limit = 1, sortType = CommonConstant.SORT_BY_TITLE, orderType = CommonConstant.ORDER_ASC) => {
    const totalCount = await axios.get('http://localhost:8000/api/products')
        .then((res) => res.data.length)
        .catch((err) => console.log(err))

    const products = await axios.get(`http://localhost:8000/api/products?_page=${page}&_limit=${limit}&_sort=${sortType}&_order=${orderType}`)
        .then((res) => res.data)
        .catch((err) => console.log(err))

    return {
        products: products,
        totalCount: totalCount
    }
}

</script>