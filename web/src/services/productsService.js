import axios from "axios";
import CommonConstant from "@/constants/commonConstant";
import Url from "../constants/urlConstant";

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

const getItemsByCategory = async (type) => {
  const res = await axios
    .get(
      `${Url.URL}products?categories=${type}&_sort=price&_order=desc&_limit=4`
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return res;
};

const buildUrlProductById = (id) => {
  return `http://localhost:8080/san-pham/${id}`;
};

export { getProducts, getItemsByCategory, buildUrlProductById };
