<script>
export default {
  data() {
    return {
      isLogged: false,
    };
  },
  mounted() {
    const user = localStorage.getItem("userLogged");
    if (user !== null) {
      this.isLogged = true;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("userLogged");
    }
  }
};
</script>

<style>
.navbar-block {
  border: 1px solid #111;
}
</style>

<template>
  <div class="container">
    <div class="row navbar" v-if="!isLogged">
      <div class="col-10"></div>

      <div class="col-2">
        <button type="button" class="btn btn-light" @click="() => this.$router.push('/dang-nhap')">
          Đăng nhập
        </button>
        <button type="button" class="btn btn-light" @click="() => this.$router.push('/dang-ky')">
          Đăng ký
        </button>
      </div>
    </div>
    <div class="row navbar-block mt-3" v-else>
      <div class="col-2">Đăng nhập thành công</div>
      <button type="button" class="btn btn-primary btn-sm col-2" @click="() => this.$router.push('/dang-nhap')">
        Đăng xuất
      </button>
      <button type="button" class="btn btn-primary btn-sm col-2" @click="() => this.$router.push('/gio-hang')">
        Giỏ Hàng
      </button>
    </div>
  </div>
</template>
