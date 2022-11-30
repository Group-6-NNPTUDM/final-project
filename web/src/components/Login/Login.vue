<template>
  <div class="login-block">
    <div class="container">
      <div class="row">
        <div class="col-3"></div>

        <div class="col-6  login-form login-form">
          <h4 class="text-center">Đăng nhập tài khoản</h4>
          <form>
            <div class="mb-3">
              <label for="email" class="form-label">Tài khoản Email (Email Account)</label>
              <input type="email" class="form-control" id="email" aria-describedby="emailHelp" required="true">
              <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Mật khẩu (Password)</label>
              <input type="password" class="form-control" id="password" required="true">
            </div>

            <button type="submit" class="btn btn-primary">Đăng Nhập</button>
          </form>
        </div>

        <div class="col-3"></div>

      </div>
    </div>
  </div>
</template>

<!-- This place for js -->
<script>
export default {
  name: 'Login',
  components: {

  }
}
</script>

<!-- This place for css -->
<style scoped>
.login-block {
  margin: 50px 0px;
}

.login-form {
  height: auto;
  border: 1px solid;
}
</style>