<template>
  <div>
    <div>
      <ul class="list-unstyled">
        <li class="nav-item link-3" v-for="item in categories" v-bind:key="item.index">
          <router-link :to="`/san-pham/${item.title}`">
            <a class="nav-link my-a" href="">
              {{ item.title }}
            </a>
          </router-link>
        </li>
      </ul>
    </div>

  </div>
</template>
<script>
import axios from 'axios'
import "@/assets/css/product/style.css"
export default {
  data() {
    return {
      categories: []
    }
  },
  async mounted() {
    const result = await getCategory();

    this.categories = result;
  },

}
const getCategory = async () => {
  const url = 'http://localhost:8000/api/categories';
  let categories = []

  try {
    await axios.get(url).then(res => categories = res.data).catch(err => console.log(err));

    return categories;
  } catch (error) {
    console.log(error);
  }
}
</script>
  
