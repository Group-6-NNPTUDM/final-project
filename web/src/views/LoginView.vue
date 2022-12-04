<script>
import Header from "../components/Header/Header.vue";
import Footer from "../components/Footer/Footer.vue";

import axios from "axios";

export default {
  data() {
    return {
      isLoginSuccess: false,
      email: "",
      password: "",
      isLogged: false,
      isLoginFirstTime: true,
    };
  },
  name: "LoginPage",
  components: {
    Header,
    Footer,
  },
  methods: {
    async login(event) {
      const okStatus = 200;
      if (event) {
        event.preventDefault();
      }

      const [email, password] = [this.email, this.password];
      const loginUrl = `http://localhost:8000/api/users?email=${email}&password=${password}`;

      this.isLogged = await axios
        .get(loginUrl)
        .then((res) => {
          if (res.data.length > 0 && res.status === okStatus) {
            return true;
          }
          this.isLoginFirstTime = false;
          return false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.login-block {
  margin: 50px 0px;
}

.login-form {
  height: auto;
  border: 1px solid;
}
</style>

<template>
  <div class="login-page">
    <Header />
    <div class="login-block">
      <div class="container">
        <div class="row">
          <div class="col-3"></div>
          <div class="col-6 login-form login-form">
            <h4 class="text-center">Đăng nhập tài khoản</h4>
            <form @click="login($event, 'login')">
              <div class="mb-3">
                <label for="email" class="form-label">Tài khoản Email (Email Account)</label>
                <input v-model="email" type="email" class="form-control" id="email" aria-describedby="emailHelp" required="true" />
                <div id="emailHelp" class="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Mật khẩu (Password)</label>
                <input v-model="password" type="password" class="form-control" id="password" required="true" />
              </div>
              <p v-if="(!isLoginFirstTime && !isLogged)" class="text-danger">Vui lòng đăng nhập lại</p>
              <button type="submit" class="btn btn-primary" @click="login($event)">
                Đăng Nhập
              </button>
            </form>
          </div>
          <div class="col-3"></div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
