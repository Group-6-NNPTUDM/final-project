<!-- This place for HTML -->
<template>
  <div class="register-block">
    <div class="container">
      <div class="row">
        <div class="col-6  register-form register-form">
          <h4 class="text-center">Đăng ký tài khoản</h4>
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
            <div class="mb-3">
              <label for="confirmedPassword" class="form-label">Nhập Lại Mật khẩu (Confirmed Password)</label>
              <input type="password" class="form-control" id="confirmedPassword" required="true">
            </div>
            <button type="submit" class="btn btn-primary">Đăng ký</button>
          </form>
        </div>
        <div class="col-6 introduce-info">
          <h4 class="text-start">Lợi ích của việc đăng ký tài khoản</h4>
          <ul>
            <li>Kiểm tra trạng thái đơn hàng</li>
            <li>Bỏ sẵn giỏ hàng để mua sau</li>
            <li>Theo dõi sản phẩm thường xuyên</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

 <!-- This place for js -->
<script>
export default {
  name: 'Register',
  components: {

  }
}
</script>

<!-- This place for css -->
<style scoped>
.register-block {
  margin: 50px 0px;
}

.register-form {
  height: auto;
  border: 1px solid;
}
</style>